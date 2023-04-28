const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

module.exports.register = async (req, res, next) => {
    const { name, password, email } = req.body;
    console.log(req.body);
    const isEmailExists = await User.findOne({ email: email });
    const isNameExists = await User.findOne({ name: name });

    if (isEmailExists || isNameExists) {
        return res.status(400).json({ message: 'User exists' });
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            User.create({
                name: req.body.name,
                email: email,
                password: hashedPassword,
            });
            return res.status(200).json({ message: 'Reg success' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Fail Reg' });
        }
    }
};

module.exports.login = async (req, res, next) => {
    const { password, email } = req.body;

    const user = await User.findOne({ email: email }).lean();

    console.log(user);

    if (user) {
        try {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                delete user.password;
                const payload = {
                    user: user,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login success', token: token, isAuth: true });
            } else {
                return res.status(401).json({ message: 'Login failed', isAuth: false });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message, isAuth: false });
        }
    } else {
        return res.status(400).json({ message: 'User unregistered', isAuth: false });
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().lean();;
        users.forEach(user => {
            delete user.password;
            // delete user._id;
        });
        return res.json({ user: users })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}



module.exports.upload = async (req, res) => {
    try {
        const fileSkin = req.files.skin
        let { name } = req.body
        if (name === undefined || name === "default") {
            return res.status(403).json("Name is Null")
        }
        let fileName = name + `.${fileSkin.mimetype.split('/')[1]}`
        fileSkin.mv(path.join('../client/public/avatar/', fileName))
        res.status(200).json("OK")
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports.password = async (req, res, next) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        console.log(newPassword + email);

        if (!newPassword || !email) {
            return res.status(500).json('Something WRONG');
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate(
            { email: email },
            { password: hashPassword }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something wrong' });
    }
};