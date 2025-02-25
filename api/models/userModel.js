const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const worksSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
})

const skillsSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    }
})

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
    },
    dob: {
        type: Date,
        default: new Date(),
    },
    address: {
        type: String,
        default: '',
    },
    portfolio: {
        type: String,
        default: '',
    },
    socialLinks: {
        type: Object,
        default: {    
        }
    },
    works: {
        type: [worksSchema],
    },
    skills: {
        type: [skillsSchema],
    },
    likedIdeas: {
        type: Array,
        default: []
    },
    commentedIdeas: {
        type: Array,
        default: []
    },
    savedIdeas: {
        type: Array,
        default: []
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
    const email = updates.email ? updates.email : null;
    const phoneNumber = updates.phoneNumber ? updates.phoneNumber : null;

    if(username) {
        const exists = await this.findOne({username});
        if(exists && exists._id != id) {
            throw Error("Username already exists!");
        }
    }

    if(email) {
        const exists = await this.findOne({email});
        if(exists && exists._id != id) {
            throw Error("Email already in use!");
        }
        if (!validator.isEmail(email)) {
            throw Error("Invalid email address!");
        }
    }

    if(phoneNumber) {
        const exists = await this.findOne({phoneNumber});
        if(exists && exists._id != id) {
            throw Error("Phone Number already in use!");
        }
        if (!validator.isMobilePhone(phoneNumber)) {
            throw Error("Invalid Phone Number!");
        }
    }

    const user = await this.findByIdAndUpdate(id, updates, {new: true});

    return user;
}

userSchema.statics.getDetails = async function (username) {
    const user = await this.findOne({username});
    const updatedUserDetails = user.toObject();
    delete updatedUserDetails.password;

    return updatedUserDetails;
}

module.exports = mongoose.model('User', userSchema);