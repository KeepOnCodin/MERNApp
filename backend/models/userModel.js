import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // for hashing the password

// create a schema
// a schema is a blueprint of how the data will be stored in the database

const userSchema = mongoose.Schema({ // mongoose.Schema is a constructor function
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // this field is required
        unique: true // this field must be unique
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // automatically create createdAt and updatedAt fields
});

userSchema.pre("save", async function (next) { // this function will run before the save method
    if (!this.isModified("password")) { // if the password is not modified
        next(); // move on
    }

    const salt = await bcrypt.genSalt(10); // generate a salt

    this.password = await bcrypt.hash(this.password, salt); // hash the password

    next(); // move on
}
);

userSchema.methods.matchPassword = async function (enteredPassword) { // this function will run when we want to login
    return await bcrypt.compare(enteredPassword, this.password); // compare the entered password with the hashed password
};

const User = mongoose.model("User", userSchema); // create a model from the schema

export default User; // export the model