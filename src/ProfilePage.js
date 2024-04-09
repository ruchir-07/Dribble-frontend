import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from './components/assets/dribblepink.svg'
import { AiOutlineRight } from "react-icons/ai";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      sessionStorage.setItem('userAvatar', fileUrl); // Store avatar URL in sessionStorage
    }
  };  

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !avatar) {
      setError('Location and avatar are required.'); // Set an error message
      return;
    }
    // Assuming you have validation and upload logic here

    navigate('/options');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-left mb-8">
      <img src={image} className="absolute top-2 left-2 p-4 w-40" alt="logo"></img>
        <h1 className="text-3xl font-bold text-gray-800 p-2">Welcome! Let's create your profile</h1>
        <p className="text-gray-600 p-2">Let others get to know you better! You can do these later</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8 items-start px-4 py-2">
          <h2 className="text-xl text-gray-800 mb-12 font-extrabold">Add an avatar</h2>
          <div className="relative flex flex-row">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-500">+</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-input"
            />
            <div className="ml-22">
            <div className="ml-20 mb-10"> 
            <label htmlFor="avatar-input" className="text-gray-600 border-2 p-2 mt-2 cursor-pointer ml-10">
              Choose image</label>
            </div>
            <div className="ml-10">
            <p className="ml-20 text-gray-400 flex justify-center items-center"><a><AiOutlineRight /></a>Or choose one of our defaults</p>
            </div>
            </div>
          </div>
        </div>

        <div className="mb-8 p-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add your location</h2>
          <input
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={handleLocationChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner bg-gray-100"
          />
        </div>
        <div className="item-center gap-y-2 p-2">
          <button
            type="submit"
            disabled={!location || !avatar} // Disable the button if no location or avatar
            className={`bg-pink-500 text-white px-20 py-2 rounded-md hover:bg-pink-600 transition-colors duration-300 ${!location || !avatar ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <span className="flex text-gray-500 text-xs mt-4" onClick={handleBackToLogin}>
            or Press RETURN
        </span>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;