const classModel = require('../model/Class');
var apiResponse = require('../utils/Response'),
    config = require('../utils/Config');

exports.createClass = (req, res) => {
    const newClass = new classModel(req);
    classModel.find({
            'classTitle': req.classTitle
        })
        .then(data => {
            if (!data.length) {
                newClass.save()
                    .then(data => {
                        res(apiResponse.success({
                            message: config.messages.create_class_success,
                            status: config.status.success,
                            result: data
                        }));
                    }).catch(err => {
                        res(apiResponse.error({
                            message: config.messages.error
                        }));
                    });
            } else {
                res(apiResponse.success({
                    status: config.status.failure,
                    message: config.messages.class_exist
                }));
            }
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};
exports.getClasses = (res) => {
    classModel.find()
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
exports.getStudentClass = (req, res) => {
    classModel.findOne({
            students: req._id
        })
        .then(data => {
            res(apiResponse.success({
                message: config.messages.data_load_success,
                status: config.status.success,
                result: data.classTitle
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};