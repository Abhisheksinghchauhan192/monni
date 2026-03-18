import useUpdateProfile from "../hooks/useUpdateProfile";
import ModalWrapper from "../components/ui/ModalWrapper";
import Input from "../components/ui/Input";

export default function EditProfileModal({ user, onClose }) {
  const { errors, handleChange, handleSubmit,values,loading } =
    useUpdateProfile(user,onClose);


  return (
    <ModalWrapper onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Helper */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Update your personal information.
        </p>

        {/* Fields */}
        <div className="space-y-3">
          <div>
            <Input
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
          <div>
            <Input
              label="Mobile Number"
              name="mobile"
              value={values.mobile|| ""}
              onChange={handleChange}
            />
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Divider + Actions */}
        <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl
              bg-gray-100 dark:bg-zinc-800
              text-sm
              hover:bg-gray-200 dark:hover:bg-zinc-700
              transition
              active:scale-[0.97]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-4 py-2 rounded-xl
              bg-emerald-500 text-white
              text-sm
              shadow-md
              hover:bg-emerald-600 hover:shadow-lg
              active:scale-[0.97]
              transition-all
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
