import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // For registration email
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle for forgot password
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateInput = () => {
    let isValid = true;
    if (username.length < 5 && !isForgotPassword) {
      setUsernameError('Username must contain at least 5 characters.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password.length < 8 && !isForgotPassword) {
      setPasswordError('Password must contain at least 8 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (email.length === 0 && isRegistering) {
      setEmailError('Email is required for registration.');
      isValid = false;
    } else if (isRegistering && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is not valid.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateInput()) {
      return;
    }

    try {
      if (isForgotPassword) {
        // Submit forgot password form
        const response = await axios.post(`${backendUrl}/admin/admin-forgetpassword`, { email });
        if (response.data.message) {
          setSuccessMessage(response.data.message);
        } else {
          setError('Failed to send reset password email.');
        }
      } else if (isRegistering) {
        // Register new user
        const response = await axios.post(`${backendUrl}/admin/register`, {
          username,
          password,
          email,
        });

        if (response.data) {
          setIsRegistering(false);
          setSuccessMessage('Registration successful. Please log in.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        // Login existing user
        const response = await axios.post(`${backendUrl}/admin/login`, {
          username,
          password,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/home');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="login-panel col-12 col-md-6 col-lg-4 p-4 shadow-sm">
        <div className="login-body">
          <div className="top d-flex justify-content-between align-items-center mb-4">
            <Link to="/">
              <i className="fa-duotone fa-house-chimney"></i>
            </Link>
          </div>
          <div className="bottom">
            <h3 className="panel-title text-center mb-4">
              {isForgotPassword ? 'Forgot Password' : isRegistering ? 'Register' : 'Admin Login'}
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
              )}

              {!isForgotPassword && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-regular fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-regular fa-lock"></i>
                    </span>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Link
                      role="button"
                      className="input-group-text password-show"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fa-duotone fa-eye${passwordVisible ? '' : '-slash'}`}></i>
                    </Link>
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                  </div>
                </>
              )}
              {isForgotPassword && (
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
              )}

              <button type="submit" className="btn w-100 mt-4" style={{ backgroundColor: 'black', color: 'white' }}>
                {isForgotPassword ? 'Send Reset Link' : isRegistering ? 'Register' : 'Sign in'}
              </button>

              {!isForgotPassword && (
                <>
                  <button
                    type="button"
                    className="btn w-100 mt-2"
                    onClick={() => setIsRegistering(!isRegistering)}
                  >
                    {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                  </button>
                  <button
                    type="button"
                    className="btn w-100 mt-2"
                    onClick={() => setIsForgotPassword(true)}
                  >
                    Forgot password?
                  </button>
                </>
              )}
              {isForgotPassword && (
                <button
                  type="button"
                  className="btn w-100 mt-2"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');  // Added for registration
//   const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
//   const [error, setError] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validateInput = () => {
//     let isValid = true;
//     if (username.length < 5) {
//       setUsernameError('Username must contain at least 5 characters.');
//       isValid = false;
//     } else {
//       setUsernameError('');
//     }

//     if (password.length < 8) {
//       setPasswordError('Password must contain at least 8 characters.');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     if (isRegistering && !/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Email is not valid.');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!validateInput()) {
//       return;
//     }

//     try {
//       if (isRegistering) {
//         // Register new user
//         const response = await axios.post(`${backendUrl}/admin/register`, {
//           username,
//           password,
//           email,
//         });

//         if (response.data) {
//           setIsRegistering(false);  // Switch to login view after successful registration
//         } else {
//           setError('Registration failed. Please try again.');
//         }
//       } else {
//         // Login existing user
//         const response = await axios.post(`${backendUrl}/admin/login`, {
//           username,
//           password,
//         });

//         if (response.data.token) {
//           localStorage.setItem('token', response.data.token);
//           navigate('/home');
//         } else {
//           setError('Login failed. Please try again.');
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
//       <div className="login-panel col-12 col-md-6 col-lg-4 p-4 shadow-sm">
//         <div className="login-body">
//           <div className="top d-flex justify-content-between align-items-center mb-4">
//             <Link to="/">
//               <i className="fa-duotone fa-house-chimney"></i>
//             </Link>
//           </div>
//           <div className="bottom">
//             <h3 className="panel-title text-center mb-4">{isRegistering ? 'Register' : 'Admin Login'}</h3>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="input-group mb-3">
//                 <span className="input-group-text">
//                   <i className="fa-regular fa-user"></i>
//                 </span>
//                 <input
//                   type="text"
//                   className={`form-control ${usernameError ? 'is-invalid' : ''}`}
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 {usernameError && <div className="invalid-feedback">{usernameError}</div>}
//               </div>
//               <div className="input-group mb-3">
//                 <span className="input-group-text">
//                   <i className="fa-regular fa-lock"></i>
//                 </span>
//                 <input
//                   type={passwordVisible ? 'text' : 'password'}
//                   className={`form-control ${passwordError ? 'is-invalid' : ''}`}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <Link
//                   role="button"
//                   className="input-group-text password-show"
//                   onClick={togglePasswordVisibility}
//                 >
//                   <i className={`fa-duotone fa-eye${passwordVisible ? '' : '-slash'}`}></i>
//                 </Link>
//                 {passwordError && <div className="invalid-feedback">{passwordError}</div>}
//               </div>
//               {isRegistering && (
//                 <div className="input-group mb-3">
//                   <span className="input-group-text">
//                     <i className="fa-regular fa-envelope"></i>
//                   </span>
//                   <input
//                     type="email"
//                     className={`form-control ${emailError ? 'is-invalid' : ''}`}
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   {emailError && <div className="invalid-feedback">{emailError}</div>}
//                 </div>
//               )}
//               <button type="submit" className="btn w-100 mt-4" style={{ backgroundColor: 'black', color: 'white' }}>
//                 {isRegistering ? 'Register' : 'Sign in'}
//               </button>
//               <button
//                 type="button"
//                 className="btn w-100 mt-2"
//                 onClick={() => setIsRegistering(!isRegistering)}
//               >
//                 {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





