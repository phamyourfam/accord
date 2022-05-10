import jwt from "jsonwebtoken";
import uniqid from "uniqid";

import {User, WhitelistedToken} from "../entities";

export function createTokens(user: User, accessTokenSecret: string | null, refreshTokenSecret: string | null) {
  const jwtOptions = {
    audience: process.env.REST_API_URL,
    issuer: "Accord REST API",
    subject: user.id
  };
  const now = Date.now();
  const accessTokenRecord = WhitelistedToken.create({id: uniqid(), tokenType: 0, user});
  const refreshTokenRecord = WhitelistedToken.create({id: uniqid(), tokenType: 1, user});
  let [accessToken, refreshToken] = ["", ""];

  if (accessTokenSecret) {
    accessToken = jwt.sign({iat: now}, accessTokenSecret ?? process.env.ACCESS_JWT_SECRET, {
      ...jwtOptions,
      expiresIn: +process.env.ACCESS_JWT_LIFETIME,
      jwtid: accessTokenRecord.id
    });

    // Save a record of the whitelisted token in the DB.
    accessTokenRecord.whitelistedAt = new Date(now);
    accessTokenRecord.save();
  }

  if (refreshTokenSecret) {
    refreshToken = jwt.sign({iat: now}, refreshTokenSecret ?? process.env.REFRESH_JWT_SECRET, {
      ...jwtOptions,
      expiresIn: +process.env.REFRESH_JWT_LIFETIME,
      jwtid: refreshTokenRecord.id
    });

    refreshTokenRecord.whitelistedAt = new Date(now);
    refreshTokenRecord.save();
  }

  return {
    accessToken,
    refreshToken
  };
}
