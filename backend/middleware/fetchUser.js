const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.SECRET_KEY;

// middleware to fetch user details.
const fetchuser = (req,res,next)=> {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, secret_key);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;