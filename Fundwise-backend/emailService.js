// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = (mailOptions) => {
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         reject(error);
//       } else {
//         console.log('Email sent:', info.response);
//         resolve(info);
//       }
//     });
//   });
// };

// module.exports = sendEmail;
