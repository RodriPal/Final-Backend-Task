const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true  },
    registerDate: { type: Date, default: Date.now() }
});

UserSchema.pre("save", function (next) {
    let user = this;

    bcrypt.genSalt(10, (error, salt) => {
        if(error){
            return next(error);
        }

        bcrypt.hash(user.password, salt, null, (error, hash) => {
            if(error){
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);