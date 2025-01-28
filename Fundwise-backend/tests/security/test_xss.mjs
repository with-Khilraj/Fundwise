import axios from 'axios';
import { expect } from 'chai';

describe('XSS Attack Testing', function() {
  this.timeout(10000); // 

  it('should prevent XSS attacks by sanitizing user input', async () => {
    const url = 'http://localhost:5500/api/auth/signup';
    const maliciousInput = '<script>alert("XSS")</script>';
    
    try {
      const response = await axios.post(url, {
        firstName: maliciousInput,
        lastName: "Test",
        email: "xss-test@example.com",
        password: "StrongPass1!"
      });
      
      expect(response.status).to.equal(400); // Assuming your server returns 400 for bad input
      expect(response.data.msg).to.not.include('<script>');
    } catch (error) {
      expect(error.response.status).to.equal(400); // Check that the server rejected the input
    }
  });
});
