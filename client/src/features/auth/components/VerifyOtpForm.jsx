import { useEffect, useRef, useState } from "react";
import { resendOtp } from "../services/auth.api";

export default function VerifyOtpForm({ email, verifyOtp, loading }) {

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  const otpValue = otp.join("");

  // countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (e.key === "Enter" && otpValue.length === 6) {
      verifyOtp(otpValue);
    }
  };

  const handlePaste = (e) => {

    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(paste)) return;

    const digits = paste.split("");

    setOtp(digits);

    inputsRef.current[5].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpValue.length === 6) {
      verifyOtp(otpValue);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(email);
      setTimer(30);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          Verify your email
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Enter the code sent to <span className="font-medium">{email}</span>
        </p>
      </div>

      {/* OTP boxes */}
      <div
        className="flex justify-center gap-3"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="
              w-12 h-12 text-center text-lg font-semibold
              border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-400
            "
          />
        ))}
      </div>

      {/* Verify button */}
      <button
        type="submit"
        disabled={loading || otpValue.length < 6}
        className="
          w-full py-2 rounded-lg
          bg-emerald-500 text-white
          hover:bg-emerald-600
          transition
        "
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* Resend */}
      <div className="text-center text-sm">

        {timer > 0 ? (
          <p className="text-gray-500">
            Resend code in {timer}s
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-emerald-600 font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}

      </div>

    </form>
  );
}