require('dotenv').config();
const express = require('express');
const User = require('../models/userData');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;
const fetchuser = require('../middleware/fetchUser');


router.use(express.json());

// Route for signup new user. No login required.
router.post('/signup',[
    // Mentioning our validations
    // the ones we mention after name, email, password are the error messages that we want to give
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password should be minimum 5 characters').isLength({min: 5})
],async (req, res) => {
    // Validations for our entry fields
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    // Checking if the user already exists
    // note that await only works with async function
    try{ // checking for duplicate user through email
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }
        //creating a secure password. First we generate salt then the secure hash.
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        //data that I will get from the website.
        const Data = {
            user: {
                id: user.id
            }
        }
        //generating the java web token and checking it
        const jwt_data = jwt.sign(Data, secret_key);

        res.json({jwt_data});

    }// If any other errors occur during the process.
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error");
    }
})

// Route to authenticate existing user. No login required.
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req, res) => {
    // Validations for our entry fields
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }

    const{email, password} = req.body;
    try{
        let user = await User.findOne({email})
        // Checking if the email is valid.
        if(!user){
            return res.status(400).json({error:'Please enter valid credentials'});
        }
        // Checking if the password is valid.
        const passCheck = await bcrypt.compare(password,user.password);
        if(!passCheck){
            return res.status(400).json({error:'Please enter valid credentials'});
        }
        
        // Creating a payload with users id to generate JWT Token
        const Data = {
            user: {
                id: user.id
            }
        }
        // Generating token and sending it back in response.
        const jwt_data = jwt.sign(Data, secret_key);
        res.json({jwt_data});

    }// If any other errors occur during the process.
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error");
    }
})

// Route-3 : get user details through login. Login required.
router.post('/getuser',fetchuser, async (req,res) => {
    //fetchuser is a middleware we use to fetch user details from the database.
    try {
        // we saved the session details at above request at data object in line 86
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        console.log(user);
        res.send(user);
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error");
    }
});

module.exports = router;