// import React, { useState } from "react";
// import "./LoginModal.css";
// import { signup, login, forgetPassword } from "../../api/auth";
// import { useUser } from "../Context/UserContext";
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

// const LoginModal = ({ isOpen, onClose }) => {
//   const [view, setView] = useState('login');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [message, setMessage] = useState('');
//   const { login: loginContext } = useUser();
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   const toggleView = (newView) => {
//     setView(newView);
//     setMessage('');
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setMessage('');

//   //   try {
//   //     if (view === 'signup') {
//   //       if (formData.password !== formData.confirmPassword) {
//   //         setMessage('Passwords do not match');
//   //         return;
//   //       }
//   //       const response = await signup(formData);
//   //       toast.success('Signup successful! Please login.');
//   //       setView('login');
//   //     } else if (view === 'login') {
//   //       const response = await login(formData);
//   //       localStorage.setItem('token', response.token);
//   //       localStorage.setItem('role', response.user.role);
//   //       loginContext(response.user, response.token);

//   //       toast.success('Successfully logged in!');
//   //       onClose();
//   //       if (response.user.role === 'admin') {
//   //         navigate('/admin');
//   //       } else {
//   //         navigate('/');
//   //       }
//   //     } else if (view === 'forgetPassword') {
//   //       const response = await forgetPassword(formData.email);
//   //       setMessage('Password reset link sent to your email');
//   //       toast.success('Password reset link sent to your email');
//   //       setView('login');
//   //     }
//   //   } catch (error) {
//   //     console.error('Login error:', error);  // Log the error details to the console
//   //     setMessage(error.msg || 'Something went wrong');
//   //     toast.error(error.msg || 'Something went wrong');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
  
//     try {
//       if (view === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           setMessage('Passwords do not match');
//           return;
//         }
//         const response = await signup(formData);
//         toast.success('Signup successful! Please verify your email.');
//         setView('login');
//       } else if (view === 'login') {
//         const response = await login(formData);
  
//         // Check if the user's email is verified unless the user is an admin
//         if (response.user.role !== 'admin' && !response.user.verified) {
//           setMessage('Please verify your email before logging in.');
//           toast.error('Please verify your email before logging in.');
//           return;
//         }
  
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('role', response.user.role);
//         loginContext(response.user, response.token);
  
//         toast.success('Successfully logged in!');
//         onClose();
//         if (response.user.role === 'admin') {
//           navigate('/admin');
//         } else {
//           navigate('/');
//         }
//       } else if (view === 'forgetPassword') {
//         const response = await forgetPassword(formData.email);
//         setMessage('Password reset link sent to your email');
//         toast.success('Password reset link sent to your email');
//         setView('login');
//       }
//     } catch (error) {
//       console.error('Login error:', error);  // Log the error details to the console
//       setMessage(error.msg || 'Something went wrong');
//       toast.error(error.msg || 'Something went wrong');
//     }
//   };
  
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           {view === 'login' && (
//             <div className="modal-login-section">
//               <h2 className="modal-title">Login to Fundwise</h2>
//               <input className="modal-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
//               <input className="modal-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
//               <a className="modal-link" onClick={() => toggleView('forgetPassword')}>Forget password?</a>
//               <button className="modal-action-button" type="submit">Login</button>
//               <button className="modal-switch-button" type="button" onClick={() => toggleView('signup')}>Sign Up Instead</button>
//             </div>
//           )}
//           {view === 'signup' && (
//             <div className="modal-signup-section">
//               <h2 className="modal-title">Create Account</h2>
//               <input className="modal-input" type="text" name="firstName" placeholder="First name" onChange={handleChange} required />
//               <input className="modal-input" type="text" name="lastName" placeholder="Last name" onChange={handleChange} required />
//               <input className="modal-input" type="email" name="email" placeholder=" Email" onChange={handleChange} required />
//               <input className="modal-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
//               <input className="modal-input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
//               <label className="modal-checkbox-label">
//                 <input type="checkbox" required />
//                 <p>I have read, understood and agree to the <span>Fund wise terms</span> and <span>privacy & condition</span></p>
//               </label>
//               <button className="modal-action-button" type="submit">Sign Up</button>
//               <button className="modal-switch-button" type="button" onClick={() => toggleView('login')}>Already have an account?</button>
//             </div>
//           )}
//           {view === 'forgetPassword' && (
//             <div className="modal-forget-password-section">
//               <h2 className="modal-title">Reset Your Password</h2>
//               <p>Please enter your email address to receive a link to create a new password via email.</p>
//               <input className="modal-input" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
//               <button className="modal-action-button" type="submit">Send Reset Link</button>
//               <button className="modal-switch-button" type="button" onClick={() => toggleView('login')}>Back to Login</button>
//             </div>
//           )}
//           {message && <p className="modal-message">{message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from "react";
import "./LoginModal.css";
import { signup, login, forgetPassword } from "../../api/auth";
import { useUser } from "../Context/UserContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../Login/PasswordIndicator/PasswordStrengthIndicator"; // Import the component

const LoginModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const { login: loginContext } = useUser();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const toggleView = (newView) => {
    setView(newView);
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 12;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    if (password.length < minLength || password.length > maxLength) {
      return `Password must be between ${minLength} and ${maxLength} characters.`;
    }

    if (!passwordRegex.test(password)) {
      return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    try {
      if (view === 'signup') {
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          setMessage(passwordError);
          toast.error(passwordError);
          return;
        }
  
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match');
          toast.error('Passwords do not match');
          return;
        }
  
        const response = await signup(formData);
        toast.success('Signup successful! Please verify your email.');
        setView('login');
      } else if (view === 'login') {
        const response = await login(formData);
  
        // Check if response.msg exists before using it
        if (response && response.msg) {
          if (response.msg.includes('Invalid credentials')) {
            toast.error(response.msg);
            return;
          }
  
          if (response.msg.includes('locked')) {
            toast.error(response.msg);
            return;
          }
        }
  
        if (response.forcePasswordChange) {
          toast.warn('Your password has expired. Please reset your password.');
          navigate('/reset-password');  // Redirect to the password reset page
          return;
        }
  
        if (response.user.role !== 'admin' && !response.user.verified) {
          setMessage('Please verify your email before logging in.');
          toast.error('Please verify your email before logging in.');
          return;
        }
  
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user.role);
        loginContext(response.user, response.token);
  
        toast.success('Successfully logged in!');
        onClose();
        if (response.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else if (view === 'forgetPassword') {
        const response = await forgetPassword(formData.email);
        setMessage('Password reset link sent to your email');
        toast.success('Password reset link sent to your email');
        setView('login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.msg || 'Something went wrong');
      toast.error(error.msg || 'Something went wrong');
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {view === 'login' && (
            <div className="modal-login-section">
              <h2 className="modal-title">Login to Fundwise</h2>
              <input className="modal-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input className="modal-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <a className="modal-link" onClick={() => toggleView('forgetPassword')}>Forget password?</a>
              <button className="modal-action-button" type="submit">Login</button>
              <button className="modal-switch-button" type="button" onClick={() => toggleView('signup')}>Sign Up Instead</button>
            </div>
          )}
          {view === 'signup' && (
            <div className="modal-signup-section">
              <h2 className="modal-title">Create Account</h2>
              <input className="modal-input" type="text" name="firstName" placeholder="First name" onChange={handleChange} required />
              <input className="modal-input" type="text" name="lastName" placeholder="Last name" onChange={handleChange} required />
              <input className="modal-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input className="modal-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <PasswordStrengthIndicator password={formData.password} /> {/* Integrate password strength indicator */}
              <input className="modal-input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
              <label className="modal-checkbox-label">
                <input type="checkbox" required />
                <p>I have read, understood and agree to the <span>Fundwise terms</span> and <span>privacy & condition</span></p>
              </label>
              <button className="modal-action-button" type="submit">Sign Up</button>
              <button className="modal-switch-button" type="button" onClick={() => toggleView('login')}>Already have an account?</button>
            </div>
          )}
          {view === 'forgetPassword' && (
            <div className="modal-forget-password-section">
              <h2 className="modal-title">Reset Your Password</h2>
              <p>Please enter your email address to receive a link to create a new password via email.</p>
              <input className="modal-input" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
              <button className="modal-action-button" type="submit">Send Reset Link</button>
              <button className="modal-switch-button" type="button" onClick={() => toggleView('login')}>Back to Login</button>
            </div>
          )}
          {message && <p className="modal-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

