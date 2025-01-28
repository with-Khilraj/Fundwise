
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Password should be hidden by default
  passwordHistory: [{ type: String, select: false }],
  phone: { type: String },
  address: { type: String },
  nation: { type: String },
  gender: { type: String },
  dob: { type: Date },
  profileImage: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  verified: { type: Boolean, default: false },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false }, 
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  passwordLastChanged: { type: Date, default: Date.now },
});


// Method to check if the account is locked
userSchema.methods.isAccountLocked = async function() {
  if (this.lockUntil && this.lockUntil > Date.now()) {
    console.log(`Account for ${this.email} is locked until ${this.lockUntil}`);
    return true; // Account is still locked
  }

  // Automatically unlock account if lockUntil has passed
  if (this.lockUntil && this.lockUntil <= Date.now()) {
    console.log(`Account for ${this.email} is now unlocked.`);
    this.failedLoginAttempts = 0;
    this.lockUntil = undefined;
    await this.save(); // Save the updated user state to the database
  }

  return false; // Account is not locked
};

// Method to increment failed login attempts and lock the account if necessary
userSchema.methods.incrementFailedLoginAttempts = async function() {
  this.failedLoginAttempts += 1;
  console.log(`Failed login attempts for ${this.email}: ${this.failedLoginAttempts}`);
  if (this.failedLoginAttempts >= 5) {
    this.lockUntil = Date.now() + 5 * 60 * 1000; // Lock for 5 minutes
    console.log(`Account for ${this.email} is now locked until ${new Date(this.lockUntil)}`);
  }
  await this.save();
};

// Method to reset failed login attempts after a successful login
userSchema.methods.resetFailedLoginAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  await this.save();
};
module.exports = mongoose.model('User', userSchema);
