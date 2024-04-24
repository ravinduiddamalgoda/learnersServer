const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;