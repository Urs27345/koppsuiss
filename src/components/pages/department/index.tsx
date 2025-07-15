"use client";
import React from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

import { floorOverview } from "../../../utils/constant";
import image101 from "@/assets/department/101.jpg";
import Container from "../../module/container";
import Configurator from "../../module/configurator";

import styles from "./style.module.scss";

type Props = {
  id: string;
};

const Department: React.FC<Props> = ({ id }) => {
  const floorNumber = id.substring(0, 1);
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2>3D visualization</h2>
          <Configurator />
        </div>
        <div className={styles.content}>
          <h2>Floor plan apartment 101</h2>
          <div>
            <Image src={image101} alt="101" />
          </div>
        </div>
        <div className={styles.content}>
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
              <p className={styles.value}>1 bedroom</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Living space:</p>
              <p className={styles.value}>46.73 m²</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Balcony:</p>
              <p className={styles.value}>10.54 m²</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Total area:</p>
              <p className={styles.value}>1st floor</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Elevator:</p>
              <p className={styles.value}>Yes</p>
            </div>
            <div className={styles.detailsRow}>
              <p className={styles.label}>Price:</p>
              <p className={styles.value}>CHF 180,000.–</p>
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
