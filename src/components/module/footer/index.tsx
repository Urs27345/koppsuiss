import React from "react";
import classNames from "classnames";
import Link from "next/link";

import Container from "../container";
import { serviceList } from "@/utils/constant";
import ScrollButton from "../../ui/scrollButton";

import styles from "./style.module.scss";

const Footer = () => {
  return (
    <div className={classNames(styles.footer, "bg-darkGray w-full")}>
      <Container>
        <div className="grid gird-cols-1 phone:grid-cols-2 tablet:grid-cols-4 pt-93 pb-49">
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
            {serviceList.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.serviceContent}>
                {group.map((service, index) => (
                  <Link key={index} href={service.href} className={styles.link}>
                    {service.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.content}>
            <h3>Follow Us</h3>
          </div>
        </div>
        <div className="pt-30 pb-12 border-t-[1px] border-[#ffffff1a]">
          <p className="text-center">Porto © 2022. All Rights Reserved.</p>
        </div>
        <ScrollButton />
      </Container>
    </div>
  );
};

export default Footer;
