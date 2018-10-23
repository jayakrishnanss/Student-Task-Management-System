const taskModel = require('../model/Task');
var apiResponse = require('../utils/Response'),
    config = require('../utils/Config');

exports.createTask = (req, res) => {
    taskModel.find({
            classTitle: req.classTitle,
            question: req.question
        })
        .then(data => {
            if (!data.length) {
                const newTask = new taskModel(req);
                newTask.save()
                    .then(data => {
                        res(apiResponse.success({
                            message: config.messages.create_task_success,
                            status: config.status.success,
                            result: data
                        }));
                    }).catch(err => {
                        res(apiResponse.error({
                            message: err
                        }));
                    });
            } else {
                taskModel.findOneAndUpdate({
                        classTitle: req.classTitle,
                        question: req.question
                    }, {
                        question: req.question,
                        solution: req.solution
                    }, {
                        new: true
                    })
                    .then(data => {
                        if (data) {
                            res(apiResponse.success({
                                message: config.messages.update_task_success,
                                status: config.status.success,
                                result: data
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
            }
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};
exports.getTasks = (req, res) => {
    taskModel.find({
            classTitle: req.classTitle
        })
        .then(data => {
            if (data) {
                res(apiResponse.success({
                    message: config.messages.data_load_success,
                    status: config.status.success,
                    result: data
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
exports.formatTask = (data) => {
    return {
        id: data._id,
        classTitle: data.classTitle,
        question: data.question
    };
};