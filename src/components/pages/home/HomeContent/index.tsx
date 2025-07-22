"use client";
import React from "react";
import Image from "next/image";

import BeachImage from "@/assets/salar01.jpg";
import SwimmingPoolImage from "@/assets/piscina01.jpg";
import EpoxiImage from "@/assets/epoxi.jpg";
import VeneerImage from "@/assets/veneer.jpg";
import PuertoImage from "@/assets/puerto.jpg";
import WindowImage from "@/assets/window.jpg";
import AirImage from "@/assets/air.jpg";
import SteelImage from "@/assets/steel.jpg";
import ElectroImage from "@/assets/electro.jpg";
import FassadeImage from "@/assets/fassade.jpg";

import styles from "./style.module.scss";
import Container from "../../../module/container";
import SliderComponent from "../../../ui/slider";
import SliderImage1 from "@/assets/home_slider/01.jpg";
import SliderImage2 from "@/assets/home_slider/02.jpg";
import SliderImage3 from "@/assets/home_slider/03.jpg";
import SliderImage4 from "@/assets/home_slider/04.jpg";

type Props = {
  dict: any;
};

const HomeContent: React.FC<Props> = ({ dict }) => {
  const contentList = [
    { content: <p dangerouslySetInnerHTML={{ __html: dict.beachDescription }} />, image: BeachImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.swimmingDescription }} />, image: SwimmingPoolImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.highQuality }} />, image: EpoxiImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.importedVeneer }} />, image: VeneerImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.stableSoundProof }} />, image: PuertoImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.soundproofAluminum }} />, image: WindowImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.airCondition }} />, image: AirImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.importedSeismic }} />, image: SteelImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.electricalSystem }} />, image: ElectroImage },
    { content: <p dangerouslySetInnerHTML={{ __html: dict.fachadaVentilada }} />, image: FassadeImage },
  ];

  return (
    <Container className={styles.wrapper}>
      {/* Intro-Text mit neuen CSS-Klassen */}
      <div className="py-4">
        <p className={styles.intro} dangerouslySetInnerHTML={{ __html: dict.intro }} />
        <p className={styles.intro1} dangerouslySetInnerHTML={{ __html: dict.intro1 }} />
      </div>

      {/* Content-Liste */}
      <div className="flex flex-col gap-14 mb-10">
        {contentList.map((item, index) => (
          <div className="grid grid-cols-2 gap-5" key={index}>
            {item.content}
            <div className="w-full">
              {!!item.image && <Image src={item.image} alt="image" className={styles.image} />}
            </div>
          </div>
        ))}
      </div>

      {/* Slider */}
      <SliderComponent>
        <Image src={SliderImage1} alt="01" />
        <Image src={SliderImage2} alt="02" />
        <Image src={SliderImage3} alt="03" />
        <Image src={SliderImage4} alt="04" />
      </SliderComponent>
    </Container>
  );
};

export default HomeContent;
