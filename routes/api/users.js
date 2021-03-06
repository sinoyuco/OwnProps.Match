const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateInput = require('../../validation/update');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ notweetsfound: 'No users found' }));
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
     User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    language: req.body.language,
                    goal: req.body.goal,
                    experience: req.body.experience,
                    birthDate: req.body.birthDate,
                    pronouns: req.body.pronouns
                });
 

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = { id: user.id, email: user.email, password: user.password, name: user.name, language: user.language, goal: user.goal, birthDate: user.birthDate, experience: user.experience, pronouns: user.pronouns}

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        id: user.id,
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        })
})


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    console.log(errors);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email; // Sinan 
    const password = req.body.password; // Alex

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, email: user.email, password: user.password, name: user.name, language: user.language, goal: user.goal, birthDate: user.birthDate, experience: user.experience, pronouns: user.pronouns };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    id: user.id,
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                                
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        }) 
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No user found with that ID' })
        );
});

router.patch('/edit', (req, res) => {
    const { errors, isValid } = validateUpdateInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } else {

        User.findOneAndUpdate({_id: req.body.id}, req.body, {new: true }, function (err, user) {
            
            if (err) {
                res.status(404).json(err)
            } else {
                res.send(user)
            }
        })
    }

     
    });
    
   
module.exports = router;
       
