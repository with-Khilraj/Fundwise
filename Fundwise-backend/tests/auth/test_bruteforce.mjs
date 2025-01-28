import axios from 'axios';
import { expect } from 'chai';

describe('Brute Force Attack Testing', function() {
  this.timeout(20000); 

  it('should lock account after 5 failed login attempts', async () => {
    const url = 'http://localhost:5500/api/auth/login';
    const userData = { email: 'aakashchdry96@gmail.com', password: 'wrongpassword' };

    for (let i = 0; i < 5; i++) {
      try {
        await axios.post(url, userData);
        console.log(`Attempt ${i + 1}: Unexpected success or wrong error code.`);
      } catch (error) {
        console.error(`Attempt ${i + 1} failed: ${error.response.status} ${error.message}`);
        expect(error.response.status).to.equal(400); 
      }
    }

    try {
      await axios.post(url, userData);
      console.error('Final attempt unexpectedly succeeded or wrong error code.');
    } catch (error) {
      console.error('Final attempt failed:', error.response.status, error.message);
      expect(error.response.status).to.equal(403); 
    }
  });
});
