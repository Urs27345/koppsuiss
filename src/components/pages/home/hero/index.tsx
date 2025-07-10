import Image from "next/image";
import React from "react";

import HeroImage from "@/assets/Fondo01.jpg";

const HeroSection = () => {
  return <Image src={HeroImage} alt="hero image" />;
};

export default HeroSection;
