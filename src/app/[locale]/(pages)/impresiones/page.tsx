"use client";
import React from "react";
import Image from "next/image";

import image1 from "@/assets/impression/1.png";
import image2 from "@/assets/impression/2.png";
import image3 from "@/assets/impression/3.png";
import image4 from "@/assets/impression/4.png";
import image5 from "@/assets/impression/5.png";
import image6 from "@/assets/impression/6.png";

import styles from "./style.module.scss";
import Container from "../../../../components/module/container";
import { useMyContext } from "../../../context/context";

const Impressions = () => {
  const { dictionary } = useMyContext();
  const imageList = [image1, image2, image3, image4, image5, image6];
  return (
    <Container>
      <div className={styles.wrapper}>
        <h1>{dictionary["Impressions"]}</h1>
        <div className={styles.context}>
          <p dangerouslySetInnerHTML={{ __html: dictionary.impressionDescription1 }} />
          <p dangerouslySetInnerHTML={{ __html: dictionary.impressionDescription2 }} />
          <div>
            <p>{dictionary.impressionDescription3}</p>
            <p>{dictionary.enjoy}</p>
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
