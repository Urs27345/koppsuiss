import React from "react";
import Image from "next/image";

import female from "@/assets/santa/female.png";
import male from "@/assets/santa/man.png";

import styles from "./style.module.scss";
import { partnerList } from "../../../utils/constant";

const SantaCruz = () => {
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
        {partnerList.map((item, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image src={item.type === "female" ? female : male} alt={`image-${index}`} className={styles.image} />
            <p className="text-center text-lg text-secondaryGray font-medium">{item.name}</p>
            <p className="text-center text-lg text-secondaryGray font-medium">{item.role}</p>
            <p className="text-center text-lg text-secondaryGray font-medium">{item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SantaCruz;
