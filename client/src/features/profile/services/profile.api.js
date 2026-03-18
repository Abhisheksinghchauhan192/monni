import http from "../../../api/http";

// Update Profile route 
export const updateProfile = async(data)=>{
    const res = await http.patch("/users/profile",data);
    return res.data;
}

/* Change Password */
export const changePassword = async (data) => {
  const res = await http.patch("/users/password", data, 
  );
  return res.data;
};

/* Delete Account */
export const deleteAccount = async (data) => {
  const res = await http.delete("/users/account",{data},);
  return res.data;
};