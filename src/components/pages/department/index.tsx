"use client";
import React from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

import { apartmentDetails, floorOverview } from "../../../utils/constant";
import image010 from "@/assets/department/010.jpg";
import image020 from "@/assets/department/020.jpg";
import image101 from "@/assets/department/101.jpg";
import image102 from "@/assets/department/102.jpg";
import image103 from "@/assets/department/103.jpg";
import image104 from "@/assets/department/104.jpg";
import image105 from "@/assets/department/105.jpg";
import image106 from "@/assets/department/106.jpg";
import image201 from "@/assets/department/201.jpg";
import image202 from "@/assets/department/202.jpg";
import image203 from "@/assets/department/203.jpg";
import image204 from "@/assets/department/204.jpg";
import image301 from "@/assets/department/301.jpg";
import image302 from "@/assets/department/302.jpg";
import image303 from "@/assets/department/303.jpg";
import image304 from "@/assets/department/304.jpg";
import image305 from "@/assets/department/305.jpg";
import image306 from "@/assets/department/306.jpg";
import image401 from "@/assets/department/401.jpg";
import image402 from "@/assets/department/402.jpg";
import image403 from "@/assets/department/403.jpg";
import image404 from "@/assets/department/404.jpg";
import image501 from "@/assets/department/501.jpg";
import image502 from "@/assets/department/502.jpg";
import image503 from "@/assets/department/503.jpg";
import image504 from "@/assets/department/504.jpg";
import image505 from "@/assets/department/505.jpg";
import image506 from "@/assets/department/506.jpg";
import Container from "../../module/container";
import Configurator from "../../module/configurator";

import styles from "./style.module.scss";

type Props = {
  id: string;
};

const Department: React.FC<Props> = ({ id }) => {
  const floorNumber = id.substring(0, 1);
  const departmentImage: { [key: string]: any } = {
    image010: image010,
    image020: image020,
    image101: image101,
    image102: image102,
    image103: image103,
    image104: image104,
    image105: image105,
    image106: image106,
    image201: image201,
    image202: image202,
    image203: image203,
    image204: image204,
    image301: image301,
    image302: image302,
    image303: image303,
    image304: image304,
    image305: image305,
    image306: image306,
    image401: image401,
    image402: image402,
    image403: image403,
    image404: image404,
    image501: image501,
    image502: image502,
    image503: image503,
    image504: image504,
    image505: image505,
    image506: image506,
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={classNames(styles.content, "tablet:max-w-[450px]")}>
          <h2>3D visualization</h2>
          <Configurator />
        </div>
        <div className={classNames(styles.content, "flex-auto")}>
          <h2>Floor plan apartment {id}</h2>
          <div>
            <Image src={departmentImage[`image${id}`]} alt="101" className="w-full" />
          </div>
        </div>
        <div className={classNames(styles.content, "max-w-[350px]")}>
          <h2>Floor overview</h2>
          <div className={styles.overviewWrapper}>
            {floorOverview.map((item, index) => (
              <p
                key={index}
                className={classNames(styles.floorRow, item.floor.toString() === floorNumber ? styles.active : "")}
              >
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2>Apartment details</h2>
          <div className={styles.apartmentContent}>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Type:</p>
              <p className={styles.value}>{apartmentDetails?.[id]?.type} bedroom</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Living space:</p>
              <p className={styles.value}>{apartmentDetails?.[id]?.livingSpace} m²</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Balcony:</p>
              <p className={styles.value}>{apartmentDetails?.[id]?.balcony} m²</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Total area:</p>
              <p className={styles.value}>{floorNumber}st floor</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Elevator:</p>
              <p className={styles.value}>{apartmentDetails?.[id]?.elevator}</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Price:</p>
              <p className={styles.value}>CHF {apartmentDetails?.[id]?.price}.–</p>
            </div>
          </div>
        </div>
        <div className="w-full"></div>
        <div className="w-full"></div>
      </div>
      <div className={styles.bottomContent}>
        <Link href={"/"} target="_blank" className={styles.additionalButton}>
          Enquire about this apartment
        </Link>
        <Link
          href={"https://koppsuisse.ch/wp-content/uploads/2025/07/101-Grundriss.pdf"}
          target="_blank"
          className={styles.additionalButton}
        >
          Floor plan as PDF
        </Link>
        <Link
          href={"https://koppsuisse.ch/wp-content/uploads/2025/07/preisliste.pdf"}
          className={styles.additionalButton}
          target="_blank"
        >
          Complete price list
        </Link>
        <Link
          href={"https://koppsuisse.ch/wp-content/uploads/2025/07/baubeschrieb.pdf"}
          className={styles.additionalButton}
          target="_blank"
        >
          Construction description
        </Link>
      </div>
    </Container>
  );
};

export default Department;
