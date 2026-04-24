const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sanitize = require('sanitize-html');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../../common/services/emailConfig');

class UserService {
  async signup(userData) {
    const { firstName, lastName, email, password } = userData;

    // Sanitize inputs
    const sanitizedFirstName = sanitize(firstName);
    const sanitizedLastName = sanitize(lastName);
    const sanitizedEmail = sanitize(email);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: hashedPassword,
      isVerified: false,
    });

    // Save the user to the database
    await user.save();

    // Generate verification token
    const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send verification email
    const verificationLink = `https://localhost:3000/verify-email?token=${verificationToken}`;
    try {
      await sendVerificationEmail(user.email, verificationLink);
    } catch (error) {
      console.error('Error sending verification email:', error);
      // We don't necessarily want to fail the signup if the email fails, 
      // but let's stick to the current logic for now.
    }

    return { id: user._id, email: user.email };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if the account is locked
    const accountLocked = await user.isAccountLocked();
    if (accountLocked) {
      throw new Error('Your account is locked due to too many failed login attempts. Please try again later.');
    }

    // Compare provided password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await user.incrementFailedLoginAttempts();
      const remainingAttempts = 5 - user.failedLoginAttempts;
      throw new Error(`Invalid credentials. You have ${remainingAttempts} attempts left.`);
    }

    // Reset failed login attempts after successful login
    await user.resetFailedLoginAttempts();

    // Generate a JWT token for the user
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  }

  async verifyEmail(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('Invalid verification token');
    }

    user.isVerified = true;
    await user.save();

    return { msg: 'Email verified successfully!' };
  }

  async forgetPassword(email, host) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No user found with that email');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://${host}/reset/${token}`;
    await sendPasswordResetEmail(user.email, resetLink);

    return { msg: 'Recovery email sent' };
  }

  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Password reset token is invalid or has expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { msg: 'Password has been updated' };
  }

  async validateToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new Error('Invalid token');
    }
    return user;
  }

  async getUserDetails(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateProfile(userId, updateData, file) {
    let profileImage;
    if (file) {
      profileImage = file.path;
    }

    const updatedData = { ...updateData };
    if (profileImage) {
      updatedData.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return updatedUser;
  }
}

module.exports = new UserService();