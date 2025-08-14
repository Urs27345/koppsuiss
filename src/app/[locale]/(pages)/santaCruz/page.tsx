"use client";
import React from "react";
import Image from "next/image";

import image1 from "@/assets/ventas/1.png";
import image2 from "@/assets/ventas/2.jpg";
import image3 from "@/assets/ventas/3.jpg";

import Container from "../../../../components/module/container";
import { useMyContext } from "../../../context/context";
import PageMeta from "../../../../components/module/pageMeta";

import styles from "./style.module.scss";

const Impressions = () => {
  const { dictionary } = useMyContext();
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
      <PageMeta
        title={dictionary["santaCruzSeoTitle"]}
        description={dictionary["santaCruzSeoDescription"]}
        url={dictionary["santaCruzSeoUrl"]}
        keywords={dictionary["santaCruzSeoKeyword"]}
        canonical={dictionary["santaCruzSeoUrl"]}
      />
      <div className={styles.wrapper}>
        <div className={styles.context}>
          <h1>{dictionary["santaCruzDescription1"]}</h1>
          <p>{dictionary["santaCruzDescription2"]}</p>
          <p>{dictionary["santaCruzDescription3"]}</p>
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
