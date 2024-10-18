import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation: check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Send a request to the backend to reset the password
      const response = await axios.post(`${process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL}/admin/admin-resetpassword`, {
        token,
        email,
        password: formData.password,
      });

      if (response.data.success) {
        setMessage('Password successfully reset');
        // Optionally redirect to login page
        navigate('/');
      } else {
        setMessage('Password reset failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Reset Password</h1>
            
            <div className="form-group mb-3">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn w-100" style={{backgroundColor:'black',color:'white'}}>Reset Password</button>
          </form>

          {message && <p className="mt-3 text-center text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;