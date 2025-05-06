import User from "../model/UserModel.js"
import { authenticateUser, saveUser } from "./AuthService.js"

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
// (?=.*[a-z]) → At least one lowercase letter
// (?=.*[A-Z]) → At least one uppercase letter
// (?=.*\d) → At least one digit
// (?=.*[@$!%*?&]) → At least one special character (@$!%*?&)
// [A-Za-z\d@$!%*?&]{8,} → Minimum 8 characters long
const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE"
}

const validateEmail = (email) => EMAIL_REGEXP.test(email) // email validation
const validatePassword = (password) => PASSWORD_REGEXP.test(password) // password validation
const validateGender = (gender) => gender === GENDER.MALE || gender === GENDER.FEMALE // gender validation
const validateName = (name) => name && name.length >= 3 // name validation

// function for fetching all users in DB
export async function allUsers(req, res) {
    try {
        const allusers = await User.find()
        res.json(allusers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// function for creating a new user in DB
export async function signupController(req, res) {
    const { name, email, password, gender } = req.body
    if (!validateEmail(email) || !validatePassword(password) || !validateGender(gender) || !validateName(name)) {
        return res.status(400).json({ message: "Invalid Details" })
    }
    const result = await saveUser(req.body)
    if (result) {
        return res.status(201).json({ message: "User Created Successfully" })
    } else {
        return res.status(500).json({ message: "Failed to Create User" })
    }

}

// function for logging in the user
export async function loginController(req, res) {
    const { email, password } = req.body
    if (!validateEmail(email) || !validatePassword(password)) {
        return res.status(400).json({ message: "Invalid email or password" })
    }
    const result = await authenticateUser(req.body);
    const statusCode = result.status
    delete result.status;
    res.status(statusCode).json({ ...result })
}

