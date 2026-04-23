const userService = require('./user.service');

const passwordValidator = (password) => {
  const minLength = 8;
  const maxLength = 12;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  if (!password) return { valid: false, msg: 'Password is required' };

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
  const { password } = req.body;

  // Validate password length and complexity before passing to service
  const passwordCheck = passwordValidator(password);
  if (!passwordCheck.valid) {
    return res.status(400).json({ msg: passwordCheck.msg });
  }

  try {
    const result = await userService.signup(req.body);
    res.status(201).json({ msg: 'Signup successful! Please verify your email.', user: result });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);
    res.json(result);
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const result = await userService.verifyEmail(token);
    res.status(200).json(result);
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await userService.forgetPassword(email, req.headers.host);
    res.status(200).json(result);
  } catch (err) {
    console.error('Forget password error:', err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
};

exports.renderResetPasswordForm = (req, res) => {
  res.redirect(`/reset/${req.params.token}`);
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ msg: 'Both password fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    const result = await userService.resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(400).json({ msg: err.message || 'Server error' });
  }
};

exports.validateToken = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const user = await userService.validateToken(token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ msg: err.message || 'Token is not valid' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserDetails(req.user);
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(404).json({ msg: err.message || 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user, req.body, req.file);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ success: false, message: err.message || 'Error updating profile' });
  }
};
