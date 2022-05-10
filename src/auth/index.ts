export * from "./createTokens";
export * from "./verifyToken";

export interface DecodedUserDetails {
  id: string;
}

export const cookieOptions = {
  httpOnly: true, // Prevents JS cookie access.
  path: "/",
  secure: false // Cookie must be sent over HTTPS.
};

export const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: +process.env.ACCESS_JWT_LIFETIME // Expires after 5 minutes.
};

export const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: +process.env.REFRESH_JWT_LIFETIME // Expires after 24 hours.
};

export interface AuthToken {
  id: string;
}
