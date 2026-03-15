import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Camera } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
        w-full
        max-w-md sm:max-w-xl lg:max-w-2xl
        bg-white dark:bg-gray-900
        border border-gray-100 dark:border-gray-800
        rounded-[2rem]
        shadow-xl
        overflow-hidden
      "
      >
        {/* Header */}
        <div
          className="
          h-32 sm:h-36 lg:h-40
          bg-linear-to-br
          from-emerald-400
          via-emerald-500
          to-teal-600
          dark:from-emerald-600
          dark:via-emerald-700
          dark:to-teal-900
        "
        />

        <div className="px-6 sm:px-8 pb-10">

          {/* Avatar + Info */}
          <div
            className="
            relative -mt-14
            flex flex-col
            sm:flex-row
            items-center sm:items-end
            gap-5 sm:gap-6
            mb-10
            text-center sm:text-left
          "
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="
                w-24 h-24
                sm:w-28 sm:h-28
                lg:w-32 lg:h-32
                rounded-[1.6rem]
                bg-white dark:bg-gray-800
                p-1
                shadow-xl
                ring-4 ring-emerald-500/10
              "
              >
                <img
                  src="/NavbarProfileImage.png"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-[1.4rem]"
                />
              </div>

              <div
                className="
                absolute -bottom-1 -right-1
                p-2
                bg-emerald-500
                text-white
                rounded-lg
                shadow-md
              "
              >
                <Camera size={16} />
              </div>
            </div>

            {/* User Info */}
            <div className="pb-1 flex-1">
              <h1
                className="
                text-2xl sm:text-3xl
                font-extrabold
                text-gray-800 dark:text-gray-100
                tracking-tight
                mb-1
              "
              >
                {user?.name}
              </h1>

              <div
                className="
                flex items-center
                justify-center sm:justify-start
                gap-2
                text-sm
                text-gray-500 dark:text-gray-400
                font-semibold
              "
              >
                <Mail size={16} className="text-emerald-500" />
                <span className="break-all">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div
            className="
            space-y-6
            bg-gray-50/60 dark:bg-gray-800/20
            p-5 sm:p-6
            rounded-[1.4rem]
            border border-gray-50 dark:border-gray-800/50
          "
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              <h2
                className="
                text-[10px]
                font-black
                text-gray-400 dark:text-gray-500
                uppercase
                tracking-[0.25em]
              "
              >
                Account Details
              </h2>
            </div>

            <div className="space-y-4">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="
                  text-[10px]
                  font-bold
                  text-emerald-500
                  uppercase
                  tracking-widest
                  ml-1
                  opacity-80
                "
                >
                  Full Name
                </span>

                <div
                  className="
                  flex items-center gap-3
                  px-4 py-3
                  bg-white dark:bg-gray-800/40
                  rounded-xl
                  border border-gray-100 dark:border-gray-700/50
                  shadow-sm
                "
                >
                  <User size={18} className="text-gray-400" />

                  <span
                    className="
                    text-sm sm:text-base
                    font-semibold
                    text-gray-800 dark:text-gray-200
                  "
                  >
                    {user?.name}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="
                  text-[10px]
                  font-bold
                  text-emerald-500
                  uppercase
                  tracking-widest
                  ml-1
                  opacity-80
                "
                >
                  Email Address
                </span>

                <div
                  className="
                  flex items-center gap-3
                  px-4 py-3
                  bg-white dark:bg-gray-800/40
                  rounded-xl
                  border border-gray-100 dark:border-gray-700/50
                  shadow-sm
                "
                >
                  <Mail size={18} className="text-gray-400" />

                  <span
                    className="
                    text-sm sm:text-base
                    font-semibold
                    text-gray-800 dark:text-gray-200
                    break-all
                  "
                  >
                    {user?.email}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}