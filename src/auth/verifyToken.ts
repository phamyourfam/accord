import jwt from "jsonwebtoken";
import {PlatformContext} from "@tsed/common";
import {Unauthorized} from "@tsed/exceptions";

import {WhitelistedToken} from "../entities";
import {accessTokenCookieOptions, refreshTokenCookieOptions} from ".";

export async function verifyToken(token: string, tokenSecret: string, ctx: PlatformContext) {
  if (!token) throw new Unauthorized("No token provided.");

  let decoded: jwt.Jwt;
  let whitelistedTokenRecord: WhitelistedToken | undefined;
  try {
    decoded = jwt.verify(token, tokenSecret, {complete: true}) as jwt.Jwt;
    whitelistedTokenRecord = await WhitelistedToken.findOne({id: decoded.payload.jti});

    if (!whitelistedTokenRecord || decoded.payload.aud !== process.env.REST_API_URL) throw Error();
  } catch (err) {
    whitelistedTokenRecord?.remove();
    ctx.getResponse().clearCookie("access_token", accessTokenCookieOptions).clearCookie("refresh_token", refreshTokenCookieOptions);

    switch (err.name) {
      case "TokenExpiredError":
        throw new Unauthorized("Token has expired.");
      default:
        throw new Unauthorized("Invalid token provided.");
    }
  }

  return decoded;
}
