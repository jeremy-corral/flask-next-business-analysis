import React, { useState } from 'react';

const Loading: React.FC = () => {
    return(
 
         <span className="animate-pulse text-white">
      <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-skyblue to-blue-300"></span>
      <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-skyblue to-blue-400 ml-2"></span>
      <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-skyblue to-blue-500 ml-2"></span>
    </span>
    );
}

export default Loading;
