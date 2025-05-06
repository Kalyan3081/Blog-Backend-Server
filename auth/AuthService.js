import User from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "./Jwt.js";
import Token from "../model/TokenModel.js";

const SALT = Number(process.env.SALT) || 10; // Ensure a valid number

export async function saveUser({ name, email, password, gender }) {
    try {
        const salt = await bcrypt.genSalt(SALT);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            gender
        });

        await user.save();
        return true;
    } catch (err) {
        console.error(`Failed to connect to database: ${email}`, err);
        return false;
    }
}

export async function authenticateUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
        return { message: "Invalid user credentials", status: 400 };
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        console.log(`Login attempt failed: Email=${email}, HashedPassword=${user.password}`);
        return { message: "Invalid Password! Please try again", status: 400 };
    }

    const token = generateToken(user);
    await upsertTokenForUser(user, token)
    return { message: "Login Successful", token, status: 200 };
}

async function upsertTokenForUser(user, token) {
    const tokenInstance = await Token.findOne({ userId: user._id });
    if (tokenInstance) {
        await tokenInstance.deleteOne();
    }
    await Token.create(
        new Token({
            userId: user._id,
            token
        })
    );
}