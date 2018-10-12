const userModel = require('../model/User');
var apiResponse = require('../utils/Response'),
    crypto = require('crypto'),
    jwt = require('jwt-simple'),
    secret = 'xxx';


// Create and Save a new User
exports.registerUser = (req, res) => {
    // Validate request
    if (!req.email || !req.firstName || !req.lastName || !req.password || !req.userType) {
        res(apiResponse.error({
            message: 'Please fill out all required fields'
        }));
    }
    const user = new userModel(req);
    userModel.find({
            'email': req.email
        })
        .then(data => {
            if (!data.length) {
                user.password = crypto.createHash('md5').update(user.password).digest("hex");
                user.accessToken = '';
                user.save()
                    .then(data => {
                        res(apiResponse.success({
                            message: 'User successfully created',
                            result: this.formatUser(data)
                        }));
                    }).catch(err => {
                        res(apiResponse.error({
                            message: err
                        }));
                    });
            } else {
                res(apiResponse.success({
                    message: 'User already exists'
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: 'User already exists'
            }));
        });
};

exports.login = (req, res) => {
    userModel.findOneAndUpdate({
            'email': req.email,
            'password': crypto.createHash('md5').update(req.password).digest("hex")
        }, {
            accessToken: jwt.encode({
                'email': req.email,
                'time': new Date()
            }, secret)
        }, {
            new: true
        })
        .then(data => {
            if (data) {
                res(apiResponse.success({
                    message: 'User successfully logged in',
                    result: this.formatUser(data)
                }));
            } else {
                res(apiResponse.success({
                    message: 'User does not exists'
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: err
            }));
        });
};

exports.formatUser = (data) => {
    return {
        id: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        accessToken: data.accessToken,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userType: data.userType
    };
};