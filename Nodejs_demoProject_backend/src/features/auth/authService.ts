import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../../models/userModel"
import envConfig from "../../config/envConfig";
import { response } from '../../interfaces/commonInterfaces';


const { secretKey } = envConfig();

class AuthService {

    async register(email: string, password: string, fullName: string) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            response.message = "User already exists";
            response.success = false;
            return response
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({ email, password: hashedPassword, fullName });

        await newUser.save();
        response.message = "User created successfully";
        response.success = true;
        return response;
    };

    async login(useremail: string, password: string) {
        const user = await User.findOne({ email: useremail });
        if (!user) {
            response.message = "Invalid email";
            response.success = false;
            // response.isActive=true
            return response;
        }
        if(user.isActive === false){
            response.isActive = false;
            response.success = false;
            return response;
        }
        const id = user._id;
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            response.message = "Invalid Password";
            response.success = false;
            response.isActive=true
            return response;
        }
       

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: "1h" });
        const role = user.role
        const fullName = user.fullName
        const email = user.email
        response.message = "Login successful";
        response.success = true;
        response.data = { token, role, fullName, email , id};
        console.log(response.data)

        return response.data
    }


}
export default new AuthService();