import { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser, logoutUser, updateProfile as updateProfileApi } from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on app mount varify the session first
  useEffect(() => {
    async function varifySession() {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch  {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    varifySession();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const response = await updateProfileApi(data);
    setUser(response.data);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        setUser,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
