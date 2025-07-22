"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import female from "@/assets/santa/female.png";
import male from "@/assets/santa/man.png";
import map from "@/assets/map.jpeg";

import { partnerList } from "../../../../utils/constant";
import Container from "../../../../components/module/container";
import { useMyContext } from "../../../context/context";

import styles from "./style.module.scss";

const SantaCruz = () => {
  const { dictionary } = useMyContext();
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.context}>
          <p>{dictionary["ventasDescription1"]}</p>
          <p>{dictionary["ventasDescription2"]}</p>
          <p>{dictionary["ventasDescription3"]}</p>
        </div>
        <div className={styles.imageContent}>
          {partnerList.map((item, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image src={item.type === "female" ? female : male} alt={`image-${index}`} className={styles.image} />
              <p className="text-center text-lg text-secondaryGray font-medium">{item.name}</p>
              <p className="text-center text-lg text-secondaryGray font-medium">{item.role}</p>
              <p className="text-center text-lg text-secondaryGray font-medium">{item.phone}</p>
            </div>
          ))}
        </div>
        <div className={styles.mapWrapper}>
          <Link href={"https://maps.app.goo.gl/mivYasvf1aFba8yP9"} target="_blank">
            <Image src={map} alt={"map"} className={styles.image} />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SantaCruz;
