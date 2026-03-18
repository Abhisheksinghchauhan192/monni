import { useAuth } from "../../context/AuthContext";
import AccountSection from "./sections/AccountSection";
import SecuritySection from "./sections/SecuritySection";
import PersonalizationSection from "./sections/PersonalizationSection";
import CategoriesSection from "./sections/CategoriesSection";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        Not authenticated
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage || "/NavbarProfileImage.png"}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Sections */}
        <AccountSection user={user} />
        <PersonalizationSection />
        <SecuritySection />
        <CategoriesSection />

      </div>
    </div>
  );
}