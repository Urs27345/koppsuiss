import React from "react";
import Image from "next/image";

import image1 from "@/assets/ventas/1.png";
import image2 from "@/assets/ventas/2.jpg";
import image3 from "@/assets/ventas/3.jpg";

import styles from "./style.module.scss";

const SantaCruz = () => {
  const imageList = [
    {
      label: "Santa Cruz Cathedral",
      image: image1,
    },
    {
      label: "Toco Toucan – Rainforest",
      image: image2,
    },
    {
      label: "Waterfall near Santa Cruz",
      image: image3,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <h1>SANTA CRUZ</h1>
      <div className={styles.context}>
        <p>
          Welcome to our sales and consulting page ! We are your reliable partner when it comes to finding the best
          solutions for your needs. Our experienced team is at your side with in-depth knowledge and personalized
          support.
        </p>
        <p>
          {`In the sales area, we offer a carefully selected range of products and services that meet the highest quality standards. Each offering is designed to provide you with added value and exceed your expectations.`}
        </p>
        <p>
          {`Our consulting services go far beyond mere sales. We take the time to understand your specific requirements and develop customized strategies that are precisely tailored to your goals. Trust our expertise for a successful collaboration.`}
        </p>
      </div>
      <div className={styles.imageContent}>
        {imageList.map((item, index) => (
          <div key={index}>
            <Image src={item.image} alt={`image-${index}`} className={styles.image} />
            <p className="text-center text-lg text-secondaryGray font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SantaCruz;
