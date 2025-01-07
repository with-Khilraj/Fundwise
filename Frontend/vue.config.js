const fs = require('fs');
const path = require('path');

module.exports = {
  // Other configuration options...

  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/server.crt')),

    },
    // If using Vue, use 'server' instead of 'https':
    // server: 'https',
    host: 'localhost',
    port: 5500,
  },
};