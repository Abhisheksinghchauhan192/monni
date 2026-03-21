import useChangePassword from "../hooks/useChangePassword";
import ModalWrapper from "../components/ui/ModalWrapper";
import Input from "../components/ui/Input";
import ModalActions from "../components/ui/ModalActions";

export default function ChangePasswordModal({ onClose }) {
  const { values, errors, handleChange, handleSubmit, loading } =
    useChangePassword(onClose);

  return (
    <ModalWrapper onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Helper text */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Use a strong password you don’t use elsewhere.
        </p>

        {/* Fields */}
        <div className="space-y-3">

          <div>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={values.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
          <ModalActions
            loading={loading}
            onClose={onClose}
            submitText="Update Password"
          />
        </div>

      </form>
    </ModalWrapper>
  );
}