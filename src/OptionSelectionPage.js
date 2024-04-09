import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import designerSvg from './components/assets/firstoption.svg';
import hireSvg from './components/assets/secondoption.svg';
import inspirationSvg from './components/assets/thirdoption.svg';
import { IoIosArrowBack, IoIosCheckmarkCircle } from "react-icons/io";
import image from './components/assets/dribblepink.svg';

const OptionSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Validate if at least one option is selected
    if (selectedOptions.length === 0) {
      // Display a warning message or prevent form submission
      alert('Please select at least one option to proceed.');
      return;
    }
    navigate('/final');
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  const options = [
    {
      id: 1,
      label: "I'm a designer looking to share my work",
      description: 'Share your design work and get feedback from the community.',
      svg: designerSvg,
    },
    {
      id: 2,
      label: "I'm looking to hire a designer",
      description: 'Find talented designers to work on your projects.',
      svg: hireSvg,
    },
    {
      id: 3,
      label: "I'm looking for design inspiration",
      description: "With over 7 million shots from a vast community of designers, Dribbble is the leading source for design inspiration.",
      svg: inspirationSvg,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-y-4">
      <div className="absolute top-4 left-4">
        <img src={image} className="top-2 left-2 p-4 w-40" alt="Logo" />
      {/*<div className="absolute top-8 left-44 bg-gray-200 rounded-lg p-2 space-y-4 md:top-8" onClick={handleBackToProfile}>*/}
        <a className=" absolute top-4 left-40 bg-gray-200 rounded-md p-2" on onClick={handleBackToProfile}><IoIosArrowBack size={20} /></a>
      </div>
      <div className="mt-24 text-center space-y-8">
        <h1 className="text-3xl flex font-extrabold font-serif justify-center items-center text-black">What brings you to Dribbble?</h1>
        <p className="sm: p-2 lg:text-gray-600 font-sans">
          Select the options that best describe you. Don't worry, you can explore other options later.
        </p>
      </div>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-1 md:grid-cols-2 gap-y-8 lg:grid-cols-3 gap-x-2 mb-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`mr-2 ml-2 border-2 shadow-slate-100 border-gray-200 w-80 h-96 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-300 ${selectedOptions.includes(option.label) ? 'bg-gray-100' : 'bg-white hover:bg-transparent'}`}
            onClick={() => handleOptionSelect(option.label)}
          >
            <div
              className={`flex-shrink-2 transition-transform duration-300 ${selectedOptions.includes(option.label) ? 'transform -translate-y-24' : ''}`}
            >
              <img src={option.svg} alt={option.label} className="h-40 m-2" />
            </div>
            <div className="ml-3 text-center flex flex-col items-center h-full justify-between mb-4">
            <h2 className={`text-md font-semibold text-gray-800 transition-transform duration-300 ${selectedOptions.includes(option.label) ? 'transform -translate-y-16' : ''}`}>
                {option.label}
              </h2>
              {selectedOptions.includes(option.label) && (
                <p className="text-gray-600 mb-8">{option.description}</p>
              )}
              {selectedOptions.includes(option.label) && (
                <div className="flex items-center justify-center">
                  <IoIosCheckmarkCircle className="w-6 h-6 bottom-2 relative text-pink-500 mr-2" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-y-4 items-center">
      {selectedOptions.length > 0 && (
          <span className=" font-serif font-bold transition-transform duration-300">Anything else? You can select multiple</span>
        )}

        <button
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          className={`bg-pink-500 text-white px-20 py-2 rounded-md transition-colors duration-300 ${selectedOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'}`}
        >
          Finish
        </button>
        <span className="text-sm flex text-gray-500 ml-4 mb-2" onClick={handleBackToProfile}>
          or Press RETURN</span>
      </div>
    </div>
  );
};

export default OptionSelectionPage;