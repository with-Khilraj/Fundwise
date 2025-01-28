// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true, // Re-enable this for compatibility
//       useUnifiedTopology: true, // Re-enable this for compatibility
//       tls: true,
//       tlsInsecure: true // Add this option to allow insecure connections for testing
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
