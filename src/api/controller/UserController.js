const userModel = require('../model/User');
var apiResponse = require('../utils/Response'),
    config = require('../utils/Config'),
    crypto = require('crypto'),
    jwt = require('jwt-simple'),
    secret = 'xxx';


// Create and Save a new User
exports.registerUser = (req, res) => {
    // Validate request
    if (!req.email || !req.firstName || !req.lastName || !req.password || !req.userType) {
        res(apiResponse.error({
            message: config.messages.required_fields
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
                            message: config.messages.signup_success,
                            status: config.status.success,
                            result: this.formatUser(data)
                        }));
                    }).catch(err => {
                        res(apiResponse.error({
                            message: config.messages.error
                        }));
                    });
            } else {
                res(apiResponse.success({
                    status: config.status.failure,
                    message: config.messages.signup_user_exists
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
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
                    message: config.messages.login_success,
                    status: config.status.success,
                    result: this.formatUser(data)
                }));
            } else {
                res(apiResponse.success({
                    status: config.status.failure,
                    message: config.messages.login_user_not_exists
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};
exports.logout = (req, res) => {
    userModel.findOneAndUpdate({
            'email': req.email
        }, {
            accessToken: ""
        }, {
            new: true
        })
        .then(data => {
            if (data) {
                res(apiResponse.success({
                    message: config.messages.logout_success,
                    status: config.status.success,
                    result: this.formatUser(data)
                }));
            } else {
                res(apiResponse.success({
                    status: config.status.failure,
                    message: config.messages.error
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
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
        userType: data.userType,
        isApproved: data.isApproved
    };
};
exports.getUsers = (req, res) => {
    userModel.find({
            'userType': req.userType
        })
        .then(data => {
            res(apiResponse.success({
                message: config.messages.data_load_success,
                status: config.status.success,
                result: data
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};
exports.approveUser = (req, res) => {
    userModel.findOneAndUpdate({
            'email': req.email
        }, {
            isApproved: req.isApproved
        }, {
            new: true
        })
        .then(data => {
            res(apiResponse.success({
                message: config.messages.approve_success,
                status: config.status.success,
                result: data
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};
exports.deleteUser = (req, res) => {
    userModel.deleteOne({
            'email': req.email
        })
        .then(data => {
            res(apiResponse.success({
                message: config.messages.delete_success,
                status: config.status.success,
                result: data
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};