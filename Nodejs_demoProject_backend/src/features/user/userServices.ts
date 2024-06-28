import User, { IUser } from "../../models/userModel"
import { response } from "../../interfaces/commonInterfaces";
import bcrypt from 'bcryptjs';

class UserService { 
  async getUserData(id: string) {
    const user = await User.findById({ _id: id }).select('-password');;
    if (!user) {
      response.message = "User not found";
      response.success = false;
      return response;
    }
    
    const userInfo = {
      fullName: user.fullName,
      email: user.email
    };
    response.data = userInfo;
    response.message = "User found";
    response.success = true;
    return response;
  }

  async updateUserProfile(userId: string, updates: Partial<IUser>) {
    if (updates.password) { 
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }
   
    const updated_user = await User.findByIdAndUpdate(userId, updates, { new: true });
    console.log("-----------updated=========",updated_user)
  
    if (!updated_user) {
      response.message = "User not found";
      response.success = false;
      return response; 
    }
    else{
      console.log("-----------updated=========",updated_user._id)
    const updated_userinfo = {
      userId : updated_user._id,
      fullName: updated_user.fullName,
      email: updated_user.email,
      role : updated_user.role
    };
    return {
      message: "User updated successfully",
      data: updated_userinfo,
      success: true,
    }
  }
  };

  async getAllUsers() {
    try {
      const all_users = await User.find({ role: "user" });
      if (all_users) {
        response.data = { all_users }
        return response
      }
    }

    catch (error) {
      console.error("Error to find task:", error);
      throw error; 
    }
  }

  async  getLatestUsers() {
    try {
      const recent_users = await User.find({ role: "user" })
        .sort({_id:-1}) // Sort by creation date in descending order
        .limit(5);  
          
        if (recent_users) {
          response.data = { recent_users }
          return response
        }
      }
  
      catch (error) {
        console.error("Error to find task:", error);
        throw error; 
      }
    }

 async blockUser(id: string) {
    try{
      const update = {
        isActive : false
      }
      const user = await User.findByIdAndUpdate( {userId:id} ,update , {new:true} );
      if (user) {
        response.message = user.fullName + " has been blocked";
        response.success = true 
        return response
    }

}
catch (error) {
    console.error("Error delete task:", error);
    throw error;
}
 }



  }
  
  
  




export default new UserService(); 