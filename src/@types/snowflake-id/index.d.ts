// Type definitions for snowflake-id 1.1.0
// Project: https://github.com/thetetrabyte/snowflake-id
// Definitions by: pham <https://github.com/phamyourfam>

interface SnowflakeOptions {
  mid?: number;
  offset?: number;
}

declare module "snowflake-id" {
  export default class Snowflake {
    constructor(options?: SnowflakeOptions) {}

    generate(): number {}
  }
}
