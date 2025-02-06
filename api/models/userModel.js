const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: '',
    },
    fullname: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        // required: true,
        // unique: true,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    }

})

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error("Email and password are required!");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email address!");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Your password is weak!");
    }

    const exists = await this.findOne({email});

    if(exists) {
        throw Error("Email already in use!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({email, password: hashedPassword});

    return user;
}

userSchema.statics.signin = async function (email, password) {
    if (!email || !password) {
        throw Error("Email and Password are required!");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email address!");
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error("Incorrect Email or Password!");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error("Incorrect Email or Password!");
    }

    return user;
}

userSchema.statics.updateDetails = async function (updates, id) {
    const username = updates.username ? updates.username : null;

    if(username) {
        const exists = await this.findOne({username});
        if(exists) {
            throw Error("Username already exists!");
        }
    }

    const user = await this.findByIdAndUpdate(id, updates, {new: true});

    return user;
}

module.exports = mongoose.model('User', userSchema);