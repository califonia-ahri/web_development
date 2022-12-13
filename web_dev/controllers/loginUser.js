const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const {username, password} = req.body;
    User.findOne({username:username}, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if(same) {
                    res.redirect("/");
                }
                else {
                    res.redirect("/auth/login");
                }
            })
        }
        else {
            res.redirect("/auth/login");
        }
    })
};