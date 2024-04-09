import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginpageSVG from './components/assets/loginpage.svg';
import image from './components/assets/Dribbble_Text_Logo_Script copy.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    let formIsValid = true;
    let newErrors = {};

    // Name should only contain alphabets
    if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = 'Name should only contain alphabets and spaces.';
      formIsValid = false;
    }

    // Username should only contain alphabets, numbers, and special characters
    if (!/^[A-Za-z0-9!@#$%^&*()_]+$/.test(username)) {
      newErrors.username = 'Username should only contain alphabets, numbers, and special characters.';
      formIsValid = false;
    }

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
      formIsValid = false;
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      formIsValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
      formIsValid = false;
    }

    const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!password) {
      newErrors.password = 'Password is required.';
      formIsValid = false;
    } else if (!passwordPolicy.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, etc.).';
      formIsValid = false;
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions.';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      sessionStorage.setItem('userEmail', email); // Storing email in sessionStorage
      navigate('/profile'); // Navigate to the next page in the flow
    } else {
      console.error('Form has errors.', errors);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="lg:flex h-screen">
      <div className="lg:w-1/3 bg-[#f2d184] p-6 flex items-center justify-center gap-y-2 ">
        <div className="p-4">
          <img className="w-1/4 mb-6 opacity-85" src={image} alt="logo"></img>
        <h1 className="sm:font-bold lg:font-bold text-[#866216] font-serif text-3xl mb-4">Discover the world's top Designers & Creatives.</h1>
          <img src={loginpageSVG} alt="Illustration" className="flex left-2 right-2 p-4 shadow-sm rounded-xl" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',}}></img>
          <p className="lg:absolute left-2 bottom-2 text-sm text-[#866216]"><a href="https://www.freepik.com/free-vector/user-research-concept-illustration_21532506.htm#query=website%20illustration&position=14&from_view=keyword&track=ais&uuid=7271c107-3f2f-448c-a975-13e3245aa0a3">Image by storyset</a> on Freepik</p>
        </div>
      </div>

      <div className="w-2/3 bg-white flex items-center justify-center gap-y-2">
      <div className="absolute gap-2 top-2 right-4 flex p-2">
          <p>Already a member?</p> <a href='#' className='text-[#4d4593]'>Sign In</a>
        </div>
        <form onSubmit={handleSubmit} className="lg:max-w-md w-full px-8 transform translate-x-14">
          <h2 className="text-2xl font-bold font-sans mb-4 text-gray-800">Sign up to Dribbble</h2>
          <div className="flex gap-2 gap-y-2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`border shadow-inner rounded-md bg-gray-100 ${errors.name ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          
          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`border shadow-inner rounded-md bg-gray-100 ${errors.username ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="johnnyD" />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          </div>
          
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border shadow-inner rounded-md bg-gray-100 ${errors.email ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="john.doe@example.com" />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          
          {/* Password field */}
          <div className="mb-4 relative gap-1">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border shadow-inner rounded-md bg-gray-100 ${errors.password ? 'border-red-500' : 'rounded'} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Your secure password"
              
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-blue-500 text-xs absolute p-1 transform -translate-x-16"
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            
          </div>
          
          {/* Terms and conditions */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">
                Creating an account means you're okay with our Terms of Service, Privacy Policy, and our default Notification Settings.
              </span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-xs italic">{errors.termsAccepted}</p>}
          </div>
          
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
