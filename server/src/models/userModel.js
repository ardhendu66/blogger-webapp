import mongoose from "mongoose";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => emailRegex.test(value),
            message: ({value}) => `EmailId-${value} is not valid`
        },
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // validate: {
        //     validator: (value) => passwordRegex.test(value),
        //     message: ({value}) => `Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long`
        // },
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        default: "https://media.licdn.com/dms/image/D4E03AQHfEqZnLFBDRw/profile-displayphoto-shrink_800_800/0/1670861970872?e=1727308800&v=beta&t=rSCS76iyAovm0tINNrf4w1bwcdovruqggSYOGvYKXIQ"
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    verifyToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
        default: new Date(new Date().setHours(new Date().getHours() + 5)),
    },
    forgotPasswordTokenExpiry: {
        type: Date,
        default: new Date(new Date().setMinutes(new Date().getMinutes() + 30)),
    },
})

const UserModel = mongoose.models.User || mongoose.model("User", userschema);

export default UserModel;