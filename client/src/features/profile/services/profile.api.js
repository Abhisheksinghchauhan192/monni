import http from "../../../api/http";

// Update Profile route 
export const updateProfile = async(data)=>{
    const res = await http.patch("/users/profile",data);
    return res.data;
}


/*Change Profile Photo */
export const uploadProfilePhoto = async(file)=>{
  const formData = new FormData();
  formData.append("photo",file);

  const res = await http.post("/users/profile/photo",formData);

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
