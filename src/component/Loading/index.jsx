import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-gray-600 text-2xl animate-spin flex items-center justify-center border-t-gray-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
