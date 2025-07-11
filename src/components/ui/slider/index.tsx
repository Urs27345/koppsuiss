"use client";
import React, { ReactNode, useRef } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Icon from "../Icon";
import styles from "./style.module.scss";

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
    arrows: false,
  };

  const sliderRef = useRef<any>(null);
  console.log("sliderRef", sliderRef);

  return (
    <div className={styles.wrapper}>
      <Slider {...settings} ref={sliderRef}>
        {child}
      </Slider>
      <button className={"left-4"} onClick={() => sliderRef.current.slickPrev()}>
        <Icon name="ArrowLeft" className="text-white w-8 h-8" />
      </button>
      <button className="right-4" onClick={() => sliderRef.current.slickNext()}>
        <Icon name="ArrowRight" className="text-white w-8 h-8" />
      </button>
    </div>
  );
};

export default SliderComponent;
