const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.private = async(req, res, next) => {
    await req.headers['x-auth-token']
    const token = req.headers['x-auth-token'];
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    //   const newToken = jwt.sign({ email: decoded.email, name: decoded.name }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
      return next()
      // возвращаем новый токен
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };