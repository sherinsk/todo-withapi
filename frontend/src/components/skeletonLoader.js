import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded p-2 mt-1 d-flex justify-content-between align-items-center skeleton">
      <div className="task-description">
        <div className="skeleton-text"></div>
      </div>
      <div className="d-flex">
        <div className="skeleton-button"></div>
        <div className="skeleton-button ms-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
