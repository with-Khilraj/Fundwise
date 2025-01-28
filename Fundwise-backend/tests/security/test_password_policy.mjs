import axios from 'axios';
import { expect } from 'chai';

describe('Password Policy Enforcement', function() {
  this.timeout(10000);

  it('should enforce strong password policies', async () => {
    const url = 'http://localhost:5500/api/auth/signup';
    const weakPassword = '12345'; 
    
    try {
      const response = await axios.post(url, {
        firstName: "Test",
        lastName: "User",
        email: "weakpassword@example.com",
        password: weakPassword
      });

     
      expect(response.status).to.equal(400);
    } catch (error) {
      expect(error.response.status).to.equal(400); 
      expect(error.response.data.msg).to.include('Password must'); 
    }
  });
});
