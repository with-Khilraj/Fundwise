const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env' });

// Validate email credentials
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are missing. Please check your .env file');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("Error verifying transporter connection:", error);
        if (error.code === 'EAUTH') {
            console.error('Authentication failed. Please check:');
            console.error('1. Your email credentials are correct');
            console.error('2. "Less secure app access" is enabled in your Google account');
            console.error('3. If using 2FA, you need to use an App Password');
        }
        process.exit(1);
    } else {
        console.log("Transporter is ready to send emails");
    }
});

/**
 * Sends a verification email to the user
 * @param {string} email - Recipient email
 * @param {string} verificationLink - The link for verification
 */
const sendVerificationEmail = async (email, verificationLink) => {
    try {

        if (!email || !verificationLink) {
            throw new Error("Email or verification link is missing");
        }

        const mailOptions = {
            from: `"FundWise" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your email address',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to FundWise!</h2>
                    <p>Your email verification link is:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 15px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 30px; letter-spacing: 5px; text-align: center; margin-top: 20px;">
                        Verify Email
                    </a>
                    <p>The verification link will expire in 2 minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

/**
 * Sends a password reset email to the user
 * @param {string} email - Recipient email
 * @param {string} resetLink - The link for password reset
 */
const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        if (!email || !resetLink) {
            throw new Error('Email and reset link are required');
        }

        const mailOptions = {
            from: `"FundWise" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your password. Click the button below to reset it:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                            style="background-color: #4CAF50; color: white; padding: 14px 28px; 
                                text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p>This link will expire in 10 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error while sending password reset email:', error);
    throw error;
  };
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    transporter
};
