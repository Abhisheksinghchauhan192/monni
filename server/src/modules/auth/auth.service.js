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
import {
  sendResetEmail,
  sendWelcomeEmail,
} from "../../services/email.service.js";
import bcrypt from "bcrypt";
import { generateOTP } from "../../utils/otp.js";
import { sendOTPEmail } from "../../services/email.service.js";

import {
  findPendingByEmail,
  createOrUpdatePending,
  incrementAttempts,
  deletePending,
} from "./pendingRegistration.model.js";
import { cleanupExpiredRegistrations } from "../../services/cleanup.service.js";
import { getUserBasicDetails } from "./auth.model.js";


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
    throw new ApiError(401, "Invalid  Token");
  }

  const passwordHash = await hashPassword(newPassword);
  await updateUserPassword(user.id, passwordHash);

  await clearResetToken(user.id);
}

// Services for Registration Validations

export async function initiateRegistration({ name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await hashPassword(password);

  const otp = generateOTP();

  const otpHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await createOrUpdatePending({
    email,
    name,
    passwordHash,
    otpHash,
    expiresAt,
  });

  await sendOTPEmail(email, otp);
  await cleanupExpiredRegistrations();
  return { email };
}

export async function verifyRegistrationOTP({ email, otp }) {
  const pending = await findPendingByEmail(email);

  if (!pending) {
    throw new ApiError(400, "No pending registration found");
  }

  if (new Date() > pending.expires_at) {
    throw new ApiError(400, "OTP expired");
  }

  if (pending.attempts >= 3) {
    throw new ApiError(429, "Too many incorrect attempts");
  }

  const valid = await bcrypt.compare(otp, pending.otp_hash);

  if (!valid) {
    await incrementAttempts(email);
    throw new ApiError(400, "Invalid OTP");
  }

  await createUser({
    name: pending.name,
    email: pending.email,
    passwordHash: pending.password_hash,
  });

  await sendWelcomeEmail(pending.email, pending.name);
  const user = await findUserByEmail(pending.email);
  if (!user) {
    throw new ApiError(401, "Something went wrong when loggin in.");
  }

  const token = generateToken({ id: user.id, publicId: user.public_id });
  await deletePending(email);

  return {
    token,
    user: {
      publicId: user.public_id,
      email: user.email,
      name: user.name,
    },
  };
}

// resend otp varification otp
export async function resendRegistrationOTP(email) {
  const pending = await findPendingByEmail(email);

  if (!pending) {
    throw new ApiError(400, "No pending registration found for this email");
  }

  // Optional: prevent too-frequent resends (e.g., 60 seconds)
  const now = Date.now();
  const createdAt = new Date(pending.created_at).getTime();

  if (now - createdAt < 60 * 1000) {
    throw new ApiError(429, "Please wait before requesting another OTP");
  }

  const otp = generateOTP();

  const otpHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await createOrUpdatePending({
    email: pending.email,
    name: pending.name,
    passwordHash: pending.password_hash,
    otpHash,
    expiresAt,
  });

  await sendOTPEmail(email, otp);

  return { email };
}

// Get Basic user Data 
export async function getUserDetailsService(userId){
  const user = await getUserBasicDetails(userId);
  return user;
}