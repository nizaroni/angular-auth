const passport = require('passport');

const User = require('../models/user-model');


// serialize: save only the ID of the user document in the session
passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});


// deserialize: retrieve the full user details from the database using the ID
// (the user is stored in the session)
passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
        if (err) {
            cb(err);
            return;
        }

        cb(null, userDocument);
    });
});
