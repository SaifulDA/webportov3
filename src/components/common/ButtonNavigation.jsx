/* eslint-disable no-unused-vars */
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
const NavigationButton = ({ direction }) => {
  return (
    <div className="text-black flex items-center justify-center hover:shadow-2xl dark:text-white transition-colors duration-300">
      {direction === "left" ? (
        <ArrowLeft size={24} />
      ) : (
        <ArrowRight size={24} />
      )}
    </div>
  );
};

export default NavigationButton;
