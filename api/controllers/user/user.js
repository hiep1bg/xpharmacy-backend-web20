import mongoose from 'mongoose';
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const usersSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String},
    address: {type: String},
    phone:{type: String},
    email:{type:String},
});

usersSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    bcrypt
      .genSalt(12)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  });

module.exports = mongoose.model('users' , usersSchema);

