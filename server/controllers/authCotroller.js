const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res, next) => {
    const { name, password, email } = req.body
    console.log(req.body)
    const isEmailExists = await User.findOne({ email: email })
    const isNameExists = await User.findOne({ name: name })

    if (isEmailExists || isNameExists) {
        // console.log(isEmailExists)
        // console.log(isNameExists)
        return res.status(400).json({message:'User exists'})
    } else {
        try {
            let salt = await bcrypt.genSalt(10)
            // console.log(salt)
            const newPassword = password.toString();
            const hashedPassword = await bcrypt.hash(newPassword, salt  );
            User.create({
                name: req.body.name,
                email: email,
                password: hashedPassword
            })
            return res.status(200).json({ message: 'Reg success' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Fail Reg'})
        }
    }
}

module.exports.login = async (req, res, next) => {
    const { password, email } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email: email });
    // console.log(User.email)

    if (user) {
        try {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                const payload = {
                    user:user
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login success', token: token, isAuth: true });
            } else {
                return res.status(401).json({ message: 'Login failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(400).json({ message: 'User unregistered' });
    }
};
module.exports.test = async (req, res, next) => {
try {
    const user = await User.find();
    return res.json({user:user})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
}
}
