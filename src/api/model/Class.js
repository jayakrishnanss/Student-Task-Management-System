const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    classTitle: {
        type: 'String',
        unique: true,
        required: true,
        dropDups: true
    },
    teacher: {
        type: 'String',
        required: true
    },
    students: {
        type:  [String],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', ClassSchema);