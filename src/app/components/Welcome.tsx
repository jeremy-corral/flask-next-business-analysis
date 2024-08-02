// components/Welcome.tsx
import React from 'react';
import Link from 'next/link';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-black">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6 animate__animated animate__fadeInDown">Welcome to STRAI</h1>
        <p className="text-lg text-gray-200 italic mb-8 animate__animated animate__fadeInUp">Let our Strategic AI branding expert guide you to a captivating brand identity</p>
        <Link className="px-6 py-3 font-bold bg-gradient-to-b from-skyblue to-blue-400 text-white rounded-full hover:bg-blue-400 transition-colors duration-500 ease-in-out focus:outline-none focus:bg-gray-600 inline-block transform hover:scale-105" href="/chat">
          Get Started
        </Link>
      </div>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate__fadeInDown {
          animation: fadeInDown 1.5s ease-in-out;
        }

        .animate__fadeInUp {
          animation: fadeInUp 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
