export const config = require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WEB_APP_URL: string;
      REST_API_URL: string;
      ACCESS_JWT_SECRET: string;
      REFRESH_JWT_SECRET: string;
      ACCESS_JWT_LIFETIME: string;
      REFRESH_JWT_LIFETIME: string;
      AGENDA_MONGODB_URI: string;
      IMAGE_KIT_ENDPOINT: string;
      IMAGE_KIT_PUBLIC_KEY: string;
      IMAGE_KIT_PRIVATE_KEY: string;
      SIB_API_KEY: string;
    }
  }
}
