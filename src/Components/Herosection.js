import React, { useState, useEffect } from "react";

const Herosection = () => {
  const images = [
    "/hero/img1.jpg",
    "/hero/img2.jpg",
    "/hero/img3.webp",
    "/hero/img4.webp",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="relative w-full h-[450px] overflow-hidden shadow-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all  duration-500 ease-in-out transform ${
              index === current ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Herosection;
