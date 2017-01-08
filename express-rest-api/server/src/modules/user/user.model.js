import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';

const authTypes = [
    'github',
    'twitter',
    'facebook',
    'google',
    'linkedin'
];

/**
 * A Validation function for local strategy properties
 */
const validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
const validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyEmail, 'Please fill in your email']
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
        default: 'http://lorempixel.com/400/200/abstract/1/'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
// Validate empty email
UserSchema
    .path('email')
    .validate(function (email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function (password) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function (value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function (err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                if (self.id === user.id) {
                    return respond(true);
                }
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

export default mongoose.model('User', UserSchema);
