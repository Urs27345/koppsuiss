"use client";
import React, { ReactNode, useRef } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  child: ReactNode;
};

const SliderComponent: React.FC<Props> = ({ child }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef<any>(null);
  console.log("sliderRef", sliderRef);

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {child}
      </Slider>
      <button
        className="relative z-40"
        onClick={() => {
          console.log("test");
          sliderRef.current.slickPrev();
        }}
      >
        test
      </button>
    </div>
  );
};

export default SliderComponent;
