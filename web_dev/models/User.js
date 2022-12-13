const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username:String,
    password:String
});

const User = mongoose.model('User', UserSchema);
module.export= User;