import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Camera } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center items-start">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-2xl overflow-hidden"
      >
        {/* Profile Header Background - Compact height */}
        <div className="h-32 bg-linear-to-br from-emerald-400 via-emerald-500 to-teal-600 dark:from-emerald-600 dark:via-emerald-700 dark:to-teal-900" />
        
        <div className="px-8 pb-10">
          {/* Avatar and Info Section - More compact gaps */}
          <div className="relative -mt-14 mb-10 flex flex-col items-center sm:flex-row sm:items-end gap-6 text-center sm:text-left">
            <div className="relative">
              <div className="w-32 h-32 rounded-[1.8rem] bg-white dark:bg-gray-800 p-1 shadow-xl ring-4 ring-emerald-500/5">
                <img 
                  src="/NavbarProfileImage.png" 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-[1.6rem]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 p-2 bg-emerald-500 text-white rounded-xl shadow-lg">
                <Camera size={16} />
              </div>
            </div>
            
            <div className="pb-2 flex-1">
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-1">
                {user?.name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                <Mail size={16} className="text-emerald-500" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Profile Details Container - Tighter padding */}
          <div className="space-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-[1.5rem] border border-gray-50 dark:border-gray-800/50">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em]">
                Account Details
              </h2>
            </div>

            <div className="space-y-4">
              {/* Name Details */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1 opacity-80">Full Name</span>
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                  <User size={18} className="text-gray-400" />
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name}
                  </span>
                </div>
              </div>

              {/* Email Details */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1 opacity-80">Email Address</span>
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
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
