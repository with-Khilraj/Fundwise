import axios from 'axios';
import { expect } from 'chai';

describe('Directory Traversal Testing', function() {
  this.timeout(10000); // 10 seconds timeout

  it('should prevent directory traversal attacks', async () => {
    const url = 'http://localhost:5500/uploads/../../../etc/passwd'; // Example of directory traversal attempt
    
    try {
      const response = await axios.get(url);
      expect(response.status).to.equal(404); // The server should not find this file
    } catch (error) {
      expect(error.response.status).to.equal(404); // Ensure the server does not allow access
    }
  });
});
