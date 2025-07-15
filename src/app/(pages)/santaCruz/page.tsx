import React from "react";
import Image from "next/image";

import image1 from "@/assets/ventas/1.png";
import image2 from "@/assets/ventas/2.jpg";
import image3 from "@/assets/ventas/3.jpg";

import styles from "./style.module.scss";
import Container from "../../../components/module/container";

const Impressions = () => {
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
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.context}>
          <p>
            Welcome to the Santa Cruz page ! Discover the fascinating culture, vibrant history, and breathtaking nature
            of this special region. Santa Cruz offers a unique blend of traditional charm and modern life that attracts
            visitors from all over the world.
          </p>
          <p>
            {`From vibrant markets to tranquil parks, from historic buildings to contemporary galleries, there's always
          something new to experience here. The local cuisine invites you to linger, and the hospitality of the people
          will delight you.`}
          </p>
          <p>
            {`Whether you're looking for adventure, relaxation, or business, Santa Cruz has something for everyone. Plan
          your visit and immerse yourself in the diversity of this wonderful destination!`}
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
    </Container>
  );
};

export default Impressions;
