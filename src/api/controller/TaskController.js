const taskModel = require('../model/Task');
const studTaskModel = require('../model/StudTask');
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
        }, req.userType === 'student' ? 'classTitle question' : '')
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
exports.submitTask = (req, res) => {
    const newStudTask = new studTaskModel(req);
    newStudTask.save()
        .then(data => {
            res(apiResponse.success({
                message: config.messages.submit_task_success,
                status: config.status.success,
                result: {}
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: err
            }));
        });
};
exports.getSubmittedTasks = (res) => {
    studTaskModel.find()
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
exports.submitResult = (req, res) => {
    studTaskModel.findOneAndUpdate({
            'email': req.email
        }, {
            mark: req.mark
        }, {
            new: true
        })
        .then(data => {
            res(apiResponse.success({
                message: config.messages.submit_task_success,
                status: config.status.success,
                result: data
            }));
        }).catch(err => {
            res(apiResponse.error({
                message: config.messages.error
            }));
        });
};