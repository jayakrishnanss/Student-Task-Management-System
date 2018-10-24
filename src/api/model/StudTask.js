const mongoose = require('mongoose');

const StudTaskSchema = mongoose.Schema({
    classTitle: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    task: {
        type: ['Object'],
        required: true
    },
    mark: {
        type: 'number',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('StudTask', StudTaskSchema);