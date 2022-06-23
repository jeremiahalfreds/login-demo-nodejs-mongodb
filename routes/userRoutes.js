const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/userModels");
const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
    const body = req.body;
    console.log(body);

    if(!(body.email && body.password)) {
        return res.status(400).send({error: "Data not formatted properly"})
    }

    // creating a new mongoose doc from the user data
    const user = new User(body);
    // generate salt to hash the password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed the password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
});

// login route
router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email: body.email});
    if (user) {
        // check user password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        console.log(validPassword);
        if (validPassword) {
            console.log("Yes....");
            res.status(200).json({message: "Access granted"});
        } else {
            res.status(400).json({message: "Access denied"});
        }
    } else {
        res.status(401).json({error: "Unauthorized access."})
    }
});

module.exports = router;