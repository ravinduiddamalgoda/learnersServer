const mongoose = require('mongoose');

const LicensePackageSchema = new mongoose.Schema({
    licensePackageID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const LicensePackage = mongoose.model('LicensePackage', LicensePackageSchema);

module.exports = LicensePackage;