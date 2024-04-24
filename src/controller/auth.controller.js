const User = require('../models/User.js');
const Admin = require('../models/Admin.js');
const Instructor = require('../models/Instructor.js');
const LicensePackage = require('../models/LicensePackage.js');
const Review = require('../models/Review.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');





/// --------------------- SIGN UP CONTROLLER ----------------------------------------------------------------------

exports.signup = async (req, res, next) => {
  try {
     
      const highestUser = await User.findOne({}, { userID: 1 }).sort({ userID: -1 }).lean();

      let nextUserID;
      if (highestUser) {
          
          const highestIDNumber = parseInt(highestUser.userID.split('_')[1]);
          nextUserID = highestIDNumber + 1;
      } else {
       
          nextUserID = 1;
      }

      const { username, email, password, phoneNumber, address, gender } = req.body;
      const hashPassword = bcryptjs.hashSync(password, 10);
      const userID = `STU_${nextUserID}`;

      const newUser = new User({ userID, username, email, password: hashPassword, phoneNumber, address, gender });

      await newUser.save();
      res.status(201).json('User created successfully!');
  } catch (error) {
      next(error);
  }
};


// const packages = await User.find(
//   ...(req.query.username && { username: req.query.username }),
//   ...(req.query.email && { email: req.query.email }),
//   ...(req.query.phoneNumber && { phoneNumber: req.query.phoneNumber }),
//   ...(req.query.userId && { _id: req.query.userId }),
//   ...(req.query.searchTerm && {
//     $or: [
//       {packageName: {$regex: req.query.searchTerm, $options: 'i'}},
//       {description: {$regex: req.query.searchTerm, $options: 'i'}},
//     ]
//   })
// )


/// --------------------- SIGN IN CONTROLLER -----------------------------------------------------------------------
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ email });
    const normalUser = await User.findOne({ email });
    const instructorUser = await Instructor.findOne({ email });

    const validUser = adminUser || normalUser || instructorUser;

    if (!validUser) {
      return next(errorHandler(404, 'User not found!'));
    }

    if (!validUser.password) {
      return next(errorHandler(401, 'Password not set!'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials!'));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};



/// --------------------- SIGN OUT CONTROLLER -----------------------------------------------------------------------
exports.signout = (req,res,next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  }
  catch (error) {
    next(error);
  }
};


/// --------------------- ADMIN REGISTRATION CONTROLLER -------------------------------------------------------------
exports.adminRegistration = async(req, res, next) => {
  const { adminID, username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({ adminID, username, email, password: hashPassword });

  try {
    await newAdmin.save();
    res.status(201).json('Admin account created successfully!');

  } catch (error) {
    next(error);
  }
};



/// --------------------- UPDATE CONTROLLER ---------------------------------------------------------
exports.updateAdmin = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    if (req.body.password && req.body.password.trim() !== '') {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }
      if (req.body.password.includes(' ')) {
        return next(errorHandler(400, 'Password cannot contain spaces'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
      delete req.body.password;
    }

    if (req.body.username) {
      if (req.body.username.length < 5 || req.body.username.length > 10) {
        return next(errorHandler(400, 'Username must be between 5 and 10 characters'));
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'Username can only contain letters and numbers'));
      }
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password
      },
    }, { new: true });

    const { password, ...rest } = updatedAdmin._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



/// --------------------- INSTRUCTOR REGISTRATION CONTROLLER ---------------------------------------------------------

exports.instructorRegistration = async (req, res, next) => {
  try {
      
      const highestInstructor = await Instructor.findOne({}, { InstructorID: 1 }).sort({ InstructorID: -1 }).lean();

      let nextInstructorID;
      if (highestInstructor) {
          
          const highestIDNumber = parseInt(highestInstructor.InstructorID.split('_')[1]);
          nextInstructorID = highestIDNumber + 1;
      } else {
          nextInstructorID = 1;
      }

      const { InstructorName, email, password, InstructorLocation, InstructorExperience } = req.body;
      const hashPassword = bcryptjs.hashSync(password, 10);
      const InstructorID = `INST_${nextInstructorID}`;

      const newInstructor = new Instructor({ InstructorID, InstructorName, email, password: hashPassword, InstructorLocation, InstructorExperience });

      await newInstructor.save();
      res.status(201).json('Instructor created successfully!');
  } catch (error) {
      next(error);
  }
};


/// --------------------- GET INSTRUCTORS CONTROLLER --------------------------------------------------------------
exports.getInstructors = async (req, res, next) => {
  if(!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const instructors = await Instructor.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const instructorsWithoutPassword = instructors.map((instructor) => {
      const { password, ...rest } = instructor._doc;
      return rest;
    });

    const totalInstructors = await Instructor.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lasthMonthInstructors = await Instructor.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      instructors: instructorsWithoutPassword,
      totalInstructors,
      lasthMonthInstructors,
    });
      
  } catch (error) {
      next(error);
    }
};




/// --------------------- ADD REVIEW CONTROLLER -----------------------------------------------------------------------
exports.addReview = async (req, res, next) => {
  try {
    const { userID, content, rating } = req.body;

    const existingReview = await Review.findOne({ userID: req.user.id });

    if (existingReview) {
      return next(errorHandler(403, 'You have already submitted a review'));
    }

    const newReview = new Review({
      userID: req.user.id, 
      content,
      rating,
    });

    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
};


/// --------------------- GET REVIEW CONTROLLER -----------------------------------------------------------------------
exports.getReview = async (req, res, next) => {
  try {

    const comments = await Review.find().sort({ createdAt: -1 })

    res.status(200).json(comments);

  } catch (error) {
    next(error);
  }
};


/// --------------------- EDIT REVIEW CONTROLLER -----------------------------------------------------------------------
exports.editReview = async (req, res, next) => {
  try{
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(errorHandler(404, 'Comment not found'));
    }

    if (review.userID !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this comment'));
    }

    const editedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        content: req.body.content,
      },
      {new: true}
    );

    res.status(200).json(editedReview);

  } catch (error){
    next(error);
  }
  
};


/// --------------------- DELETE REVIEW CONTROLLER -----------------------------------------------------------------------
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(errorHandler(404, 'Comment not found!'));
    }
    if (review.userID !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this comment'));
    }
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    next(error);
  }
  
};


/// --------------------- GET USER CONTROLLER -----------------------------------------------------------------------
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



/// --------------------- DELETE USER CONTROLLER -----------------------------------------------------------------------
exports.deleteUser = async (req, res, next) => {
  const { id } = req.user;
  const { userId } = req.params;

  if (!req.user.isAdmin && id !== userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
    let deletedUser;

    if (await Admin.findById(userId)) {
      deletedUser = await Admin.findByIdAndDelete(userId);
    } else if (await User.findById(userId)) {
      deletedUser = await User.findByIdAndDelete(userId);
    } else if (await Instructor.findById(userId)) {
      deletedUser = await Instructor.findByIdAndDelete(userId);
    }

    if (!deletedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};



/// --------------------- ADD LICENSE PACKAGE CONTROLLER --------------------------------------------------------------
const licensePkgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../LearnersFrontEnd/src/assets/LicensePkgs');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
})

const uploadLicenseImage = multer({ storage: licensePkgStorage })

exports.addLicensePackage = async (req, res, next) => {
  uploadLicenseImage.single('image')(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    const imageName = req.file.filename;
    const { image = imageName, packageName, description, price } = req.body;
    const newLicensePackage = new LicensePackage({ image, packageName, description, price });

    try {
      await newLicensePackage.save();
      res.status(201).json('license package added successfully!');
    } catch (error) {
      next(error);
    }
  });
}



/// --------------------- GET LICENSE PACKAGE CONTROLLER --------------------------------------------------------------
exports.getLicensePackage = async (req, res, next) => {
  try {
    const start = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const packages = await LicensePackage.find({
      ...(req.query.packageId && { _id: req.query.packageId }),
      ...(req.query.searchTerm && {
        $or: [
          {packageName: {$regex: req.query.searchTerm, $options: 'i'}},
          {description: {$regex: req.query.searchTerm, $options: 'i'}},
        ],
      }),
    })
      .sort({ updatedAt: sortDirection})
      .skip(start)
      .limit(limit);

    const totalPackages = await LicensePackage.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPackages = await LicensePackage.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      packages,
      totalPackages,
      lastMonthPackages,
    });

  } catch (error) {
    next(error);
  }
};


/// --------------------- UPDATE LICENSE PACKAGE CONTROLLER --------------------------------------------------------------

const licensePkgUploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'LearnersFrontEnd/src/assets/LicensePkgs');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});


const uploadLicensePkgImage = multer({ storage: licensePkgUploadStorage });

exports.updateLicensePackage = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
   
    if (req.file) {
    
      req.body.image = req.file.filename;
    }
    
    const updatedPackage = await LicensePackage.findByIdAndUpdate(
      req.params.packageId,
      {
        $set: {
          packageName: req.body.packageName,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
        },
      }, 
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch(error) {
    next(error);
  }
};


/// --------------------- DELETE LICENSE PACKAGE CONTROLLER --------------------------------------------------------------
exports.deleteLicensePackage = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await LicensePackage.findByIdAndDelete(req.params.packageId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};


/// --------------------- GET USERS CONTROLLER --------------------------------------------------------------
exports.getUsers = async (req, res, next) => {
  if(!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lasthMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lasthMonthUsers,
    });
      
  } catch (error) {
      next(error);
    }
};
