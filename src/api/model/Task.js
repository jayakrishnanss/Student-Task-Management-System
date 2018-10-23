
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    classTitle: {
        type: 'String',
        required: true
    },
    question: {
        type: 'String',
        required: true
    },
    solution: {
        type: 'Boolean',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);