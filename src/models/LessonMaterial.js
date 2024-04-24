const mongoose = require('mongoose');

const LessonMaterialSchema = new mongoose.Schema({
    lessonID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
});

const LessonMaterial = mongoose.model('LessonMaterial', LessonMaterialSchema);

module.exports = LessonMaterial;