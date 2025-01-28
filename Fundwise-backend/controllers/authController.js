// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Configure Nodemailer with Gmail credentials
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       password: await bcrypt.hash(password, 10)
//     });

//     await user.save();

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch user details and explicitly include the password for authentication check
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Ensure password is not included in the response
//     user.password = undefined;

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return both the token and the user details, excluding the password
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.validateToken = (req, res) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token provided' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ valid: true, userId: decoded.userId });
//   } catch (error) {
//     res.status(401).json({ valid: false, msg: 'Token is invalid' });
//   }
// };

// exports.forgetPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: 'No user found with that email' });
//     }

//     const token = crypto.randomBytes(20).toString('hex');

//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Fundwise Password Reset',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://${req.headers.host}/reset/${token}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     transporter.sendMail(mailOptions, (err, response) => {
//       if (err) {
//         console.error('There was an error:', err);
//         return res.status(500).json({ msg: 'Error sending email' });
//       } else {
//         res.status(200).json('Recovery email sent');
//       }
//     });
//   } catch (err) {
//     console.error('Forget password error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.renderResetPasswordForm = (req, res) => {
//   res.redirect(`/reset/${req.params.token}`);
// };

// exports.resetPassword = async (req, res) => {
//   const { newPassword, confirmPassword } = req.body;
//   const { token } = req.params;

//   console.log(`Token: ${token}`);
//   console.log(`Received newPassword: ${newPassword}`);
//   console.log(`Received confirmPassword: ${confirmPassword}`);

//   if (!newPassword || !confirmPassword) {
//     return res.status(400).json({ msg: 'Both password fields are required' });
//   }

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ msg: 'Passwords do not match' });
//   }

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ msg: 'Password has been updated' });
//   } catch (err) {
//     console.error('Error resetting password:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const sanitize = require('sanitize-html');

// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const passwordValidator = (password) => {
  const minLength = 8;
  const maxLength = 12;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  if (password.length < minLength || password.length > maxLength) {
    return { valid: false, msg: `Password must be between ${minLength} and ${maxLength} characters.` };
  }

  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      msg: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    };
  }

  return { valid: true };
};


exports.signup = async (req, res) => {
  // Sanitize inputs to prevent XSS attacks
  const sanitizedFirstName = sanitize(req.body.firstName);
  const sanitizedLastName = sanitize(req.body.lastName);
  const sanitizedEmail = sanitize(req.body.email);
  const { password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email: sanitizedEmail });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Validate password length and complexity
    const passwordCheck = passwordValidator(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ msg: passwordCheck.msg });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = new User({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: hashedPassword,
      verified: false,  
    });

    // Save the user to the database
    await user.save();

    // Generate verification token
    const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send verification email with localhost link
    const verificationLink = `https://localhost:3000/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify your email address',
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    });

    res.status(201).json({ msg: 'Signup successful! Please verify your email.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log(`Login attempt with invalid email: ${email}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the account is locked
    const accountLocked = await user.isAccountLocked();
    if (accountLocked) {
      console.log(`Login attempt on locked account: ${email}`);
      return res.status(403).json({ msg: 'Your account is locked due to too many failed login attempts. Please try again later.' });
    }

    // Compare provided password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await user.incrementFailedLoginAttempts();
      const remainingAttempts = 5 - user.failedLoginAttempts;
      console.log(`Login failed for ${email}, remaining attempts: ${remainingAttempts}`);
      return res.status(400).json({ msg: `Invalid credentials. You have ${remainingAttempts} attempts left.` });
    }

    // Reset failed login attempts after successful login
    await user.resetFailedLoginAttempts();

    // Generate a JWT token for the user
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid verification token' });
    }

    // Update user verification status
    user.verified = true;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully!' });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


//forgetpassword
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'No user found with that email' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Fundwise Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error:', err);
        return res.status(500).json({ msg: 'Error sending email' });
      } else {
        res.status(200).json('Recovery email sent');
      }
    });
  } catch (err) {
    console.error('Forget password error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.renderResetPasswordForm = (req, res) => {
  res.redirect(`/reset/${req.params.token}`);
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;

  console.log(`Token: ${token}`);
  console.log(`Received newPassword: ${newPassword}`);
  console.log(`Received confirmPassword: ${confirmPassword}`);

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ msg: 'Both password fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password has been updated' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.validateToken = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    res.json({ user }); // Ensure it returns the user object
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

//User profile
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user; // Use the user ID from middleware
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user; // Assuming the user ID is attached to req.user by the auth middleware

    // Handle file upload if there's a new profile image
    let profileImage;
    if (req.file) {
      profileImage = req.file.path; // Assuming multer sets the path to req.file.path
    }

    const updatedData = { ...req.body };
    if (profileImage) {
      updatedData.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error });
  }
};
