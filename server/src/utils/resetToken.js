import crypto from "crypto";

export function generateResetToken() {
  //Random 32 byte string
  const rawToken = crypto.randomBytes(32).toString("hex");
  // Hash Token Before saving to DB

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return {
    rawToken,
    hashedToken,
  };
}
