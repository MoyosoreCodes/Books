const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: [true, "Enter your fisrtname"]
    },
    lastname: {
        type: String,
        required: [true, "Enter your lastname"]
    },
    email: {
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        unique: true,
        lowercase: true,
        minlength: [6, 'Minimum length is 6 characters']
    },
    gender: {
        type: String,
    },
    country: {
        type: String, 
        required: [true, 'Country must be specified']
    }
}, {timestamps: true});



const Users =  mongoose.model('User', userSchema);

userSchema.pre('save', async function(next){
    const salt = bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.checklogin = async function(email, password){
    const user = await this.findOne({ email });
    if (user) {
        const authResult = await bcrypt.compare(password, user.password);
        if (authResult) {
            return user;
        }
    }
};

module.exports = Users;