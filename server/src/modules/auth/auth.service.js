import {
  createUser,
  findUserByEmail,
  saveResetToken,
  findUserByResetToken,
  updateUserPassword,
  clearResetToken,
} from "../users/user.model.js";
import ApiError from "../../errors/ApiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";
import crypto from "crypto";
import { generateResetToken } from "../../utils/resetToken.js";
import { sendResetEmail } from "../../services/email.service.js";

// Registration of User Business Logic
export async function registerUser({ name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = createUser({ name, email, passwordHash });

  return user;
}

// Login User Business Logic
export async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password_hash))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({ id: user.id, publicId: user.public_id });

  return {
    token,
    user: {
      publicId: user.public_id,
      email: user.email,
      name: user.name,
    },
  };
}

// Business logic of Password Reseting..

export async function forgotPasswordService(email) {
  const user = await findUserByEmail(email);

  // if already exists do not reveal it.
  if (!user) {
    return;
  }

  const { rawToken, hashedToken } = generateResetToken();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 Minutes
  await saveResetToken(user.id, hashedToken, expiresAt);

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

  await sendResetEmail(user.email, resetLink);
}

export async function resetPasswordService(token, newPassword) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    throw new ApiError(401,"Invalid  Token");
  }

  const passwordHash = await hashPassword(newPassword);
  await updateUserPassword(user.id, passwordHash);

  await clearResetToken(user.id);
}
