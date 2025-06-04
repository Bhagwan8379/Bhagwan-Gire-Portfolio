import React from "react";

const Loader = () => {
    return (
        <>
            <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 3s linear infinite;
        }
      `}</style>

            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                <div className="relative w-16 aspect-square grid place-items-center mb-4">
                    <div className="absolute w-full h-full border-4 border-transparent border-r-teal-400 rounded-full animate-spin" />
                    <div className="absolute w-[88%] h-[88%] border-4 border-transparent border-r-purple-500 rounded-full animate-spin-slow" />
                    <div className="absolute w-[70%] h-[70%] border-4 border-transparent border-r-pink-500 rounded-full animate-spin-slower" />
                </div>
                <p className="text-lg font-medium tracking-wide text-teal-200">Please wait...</p>
            </div>
        </>
    );
};

export default Loader;
