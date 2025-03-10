/* eslint-disable no-unused-vars */
import React from "react";

// eslint-disable-next-line react/prop-types
const LazyImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export default LazyImage;
