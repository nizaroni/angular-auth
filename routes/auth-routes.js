const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');


const router = express.Router();


router.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }

    // see if the username is already taken (query the database)
    User.findOne({ username: username }, '_id', (err, foundUser) => {
        // the username is taken if we found a user
        if (foundUser) {
            res.status(400).json({ message: 'The username already exists' });
            return;
        }

        // save the user to the database if we didn't find a user
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const theUser = new User({
            username: username,
            password: hashPass
        });

        theUser.save((err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }

            // if we get here we are GOOD!
            // log the user in
            req.login(theUser, (err) => {
                // hide the password from the frontend by setting it to undefined
                theUser.password = undefined;
                res.status(200).json(theUser);
            });
        }); // theUser.save()
    }); // User.findOne()
}); // POST /signup


router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // see if the username credential is valid
    User.findOne({ username: username }, (err, foundUser) => {
        // send an error if no user with that username
        if (!foundUser) {
            res.status(400).json({ message: 'Incorrect username' });
            return;
        }

        // send an error if password is wrong
        if (!bcrypt.compareSync(password, foundUser.password)) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        // if we get here we are GOOD!
        // log the user in
        req.login(foundUser, (err) => {
            // hide the password from the frontend by setting it to undefined
            foundUser.password = undefined;
            res.status(200).json(foundUser);
        });
    }); // User.findOne()
}); // POST /login


module.exports = router;
