import axios from 'axios';
import { expect } from 'chai';

describe('CSRF Attack Testing', function() {
  this.timeout(10000); // 10 seconds timeout

  it('should prevent CSRF attacks by requiring a valid CSRF token', async () => {
    const url = 'http://localhost:5500/api/campaigns';
    
    try {
      // Attempt to perform a state-changing request without a CSRF token
      const response = await axios.post(url, {
        title: "Test Campaign",
        description: "This is a test campaign",
        goal: 1000,
      }, {
        headers: {
          // Intentionally omit CSRF token
        }
      });
      
      expect(response.status).to.equal(403); // Assuming the server returns 403 for missing CSRF token
    } catch (error) {
      expect(error.response.status).to.equal(403); // Check that the server rejected the request
      expect(error.response.data.msg).to.include('CSRF token missing or incorrect');
    }
  });
});
