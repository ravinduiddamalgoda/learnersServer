const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');

const { 
  signup, 
  signin, 
  adminRegistration, 
  updateAdmin, 
  instructorRegistration,
  getInstructors, 
  addLicensePackage, 
  getLicensePackage, 
  updateLicensePackage,
  deleteLicensePackage,
  addReview, 
  getReview,
  editReview,
  deleteReview,
  deleteUser, 
  signout,
  getUsers,
  getUser
} = require('../controller/auth.controller.js') ;

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.post('/adminRegistration', adminRegistration);
router.put('/admin-update/:userId', verifyToken, updateAdmin);
router.delete('/delete/:userId', verifyToken, deleteUser);

router.post('/instructor-registration', instructorRegistration);
router.get('/getinstructors', verifyToken, getInstructors);

router.post('/addLicense-package', verifyToken, addLicensePackage);
router.get('/getLicense-packages', getLicensePackage);
router.put('/update-package/:packageId/:userId', verifyToken, updateLicensePackage);
router.delete('/delete-package/:packageId/:userId', verifyToken, deleteLicensePackage);

router.get('/getusers', verifyToken, getUsers);

router.post('/addReview', verifyToken, addReview);
router.get('/getReview', verifyToken, getReview);
router.get('/:userId', getUser);
router.put('/editReview/:reviewId', verifyToken, editReview);
router.delete('/deleteReview/:reviewId', verifyToken, deleteReview);



module.exports = router;
