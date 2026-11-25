declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    PROVISIONING_TOKEN?: string;
    BUCKET?: R2Bucket;
  }
}
