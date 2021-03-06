const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    data.language = validText(data.language) ? data.language : '';
    data.goal = validText(data.goal) ? data.goal : '';
    data.experience = validText(data.experience) ? data.experience : '';
    data.pronouns = validText(data.pronouns) ? data.pronouns : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (Validator.isEmpty(data.language)) {
        errors.language = 'Language field is required';
    }
    
    if (Validator.isEmpty(data.goal)) {
        errors.goal = 'Goal field is required';
    }

    if (Validator.isEmpty(data.experience)) {
        errors.experience = 'Experience field is required';
    }

    if (Validator.isEmpty(data.pronouns)) {
        errors.pronouns = 'Pronouns field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    if (Validator.isEmpty(data.birthDate)) {
        errors.birthdate = 'Birthdate field is required';
    }

    // if (Validator.isEmpty(data.birthDate)) {
    //     errors.experience = 'Experience field is required';
    // }

    

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};