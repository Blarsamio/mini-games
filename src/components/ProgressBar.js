import React from 'react';

const ProgressBar = ({ progress }) => {

  return (
    <div className="w-[50%] bg-transparent border-2 rounded">
      <div className="bg-white py-2" style={{ width: `${progress}%` }}>
      </div>
    </div>
  );
};

export default ProgressBar;
