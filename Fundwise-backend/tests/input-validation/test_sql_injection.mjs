
import axios from 'axios';
import { expect } from 'chai';

describe('SQL Injection Testing', function() {
  it('should not allow SQL injection via login', async () => {
    const url = 'http://localhost:5500/api/auth/login';
    const userData = { email: "' OR 1=1; --", password: 'anything' };
    
    const response = await axios.post(url, userData).catch((err) => err.response);
    expect(response.status).to.equal(400);
    expect(response.data.msg).to.not.include('Welcome');
  });
});
