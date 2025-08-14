import Image from "next/image";
import React from "react";

import HeroImage from "@/assets/Fondo01.jpg";
import PageMeta from "../../../module/pageMeta";
import { useMyContext } from "../../../../app/context/context";

const HeroSection = () => {
  const { dictionary } = useMyContext();

  return (
    <>
      <PageMeta
        title={dictionary["homeSeoTitle"]}
        description={dictionary["homeSeoDescription"]}
        url={dictionary["homeSeoUrl"]}
        keywords={dictionary["homeSeoKeyword"]}
        canonical={dictionary["homeSeoUrl"]}
      />
      <Image src={HeroImage} alt="hero image" priority />
    </>
  );
};

export default HeroSection;
