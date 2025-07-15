import React from "react";
import Image from "next/image";

import image1 from "@/assets/impression/1.png";
import image2 from "@/assets/impression/2.png";
import image3 from "@/assets/impression/3.png";
import image4 from "@/assets/impression/4.png";
import image5 from "@/assets/impression/5.png";
import image6 from "@/assets/impression/6.png";

import styles from "./style.module.scss";
import Container from "../../../components/module/container";

const Impressions = () => {
  const imageList = [image1, image2, image3, image4, image5, image6];
  return (
    <Container>
      <div className={styles.wrapper}>
        <h1>Impressions</h1>
        <div className={styles.context}>
          <p>
            <b>{`Welcome to the "Impressions"`}</b> {`page ! Here you will get an insight into the`}
            <br />
            <b>beauty and diversity of our projects.</b> {`Each image tells a story of our dedication and commitment.`}
          </p>
          <p>
            We invite you to browse our gallery and discover the results of our work.
            <br /> From the initial sketches to the final implementation – we capture the most important moments.
          </p>
          <div>
            <p>Discover how we turn ideas into reality and deliver impressive results.</p>
            <p>Enjoy!</p>
          </div>
        </div>
        <div className={styles.imageContent}>
          {imageList.map((item, index) => (
            <Image src={item} key={index} alt={`image-${index}`} className={styles.image} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Impressions;
