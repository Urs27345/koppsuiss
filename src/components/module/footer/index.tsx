import React from "react";
import Container from "../container";
import styles from "./style.module.scss";
import classNames from "classnames";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className={classNames(styles.footer, "bg-darkGray fixed bottom-0 w-full")}
    >
      <Container>
        <div className="grid grid-cols-4 pt-93 pb-49">
          <div>
            <h3>Company</h3>
            <p>12345 Porto Blvd.</p>
            <p>Suite 1500</p>
            <p>Los Angeles, California 90000</p>
          </div>
          <div className={styles.contacts}>
            <h3>Our Contacts</h3>
            <p>800-123-4567</p>
          </div>
          <div className={styles.services}>
            <h3>Services</h3>
            <div className={styles.serviceContent}>
              <Link href={""} className={styles.link}>
                Residential Solar Panels
              </Link>
              <Link href={""} className={styles.link}>
                About Us
              </Link>
            </div>
            <div className={styles.serviceContent}>
              <Link href={""} className={styles.link}>
                Commercial Solar Panels
              </Link>
              <Link href={""} className={styles.link}>
                Our Services
              </Link>
            </div>
            <div className={styles.serviceContent}>
              <Link href={""} className={styles.link}>
                Energy Stations
              </Link>
              <Link href={""} className={styles.link}>
                News
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            <h3>Follow Us</h3>
          </div>
        </div>
        <div className="pt-30 pb-12 border-t-[1px] border-[#ffffff1a]">
          <p className="text-center">Porto © 2022. All Rights Reserved.</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
