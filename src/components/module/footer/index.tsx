"use client";
import React from "react";
import classNames from "classnames";

import Container from "../container";
import ScrollButton from "../../ui/scrollButton";
import Icon, { IconType } from "../../ui/Icon";
import { socialLinks } from "../../../utils/constant";
import { useMyContext } from "../../../app/context/context";

import styles from "./style.module.scss";

const Footer = () => {
  const socialHoverClasses: { [key: string]: string } = {
    fourthBlue: "hover:bg-fourthBlue",
    secondBlue: "hover:bg-secondBlue",
    thirdBlue: "hover:bg-thirdBlue",
    brown: "hover:bg-brown",
  };

  const { dictionary } = useMyContext();
  return (
    <div className={classNames(styles.footer, "bg-darkGray w-full")}>
      <Container>
        <div className="grid gird-cols-1 phone:grid-cols-2 tablet:grid-cols-4 pt-93 pb-49 gap-5 tablet:gap-0">
          <div>
            <h3>{dictionary["Pursue"]}</h3>
            <p>{dictionary["KoppSuisseSRL"]}</p>
            <p>{dictionary["May18th1000SantaCruz"]}</p>
          </div>
          <div className={styles.contacts}>
            <h3>{dictionary["OurContacts"]}</h3>
            <a className="flex items-center gap-2" href="tel:+591 71634174">
              <Icon name="Phone" className="w-6 h-6 text-green" />
              <p>+591 716 34 177</p>
            </a>
            <a className="flex items-center gap-2" href="mailto:casa@koppsuisse.ch">
              <Icon name="Mail" className="w-6 h-6 text-green" />
              <p>casa@koppsuisse.ch</p>
            </a>
          </div>
          <div className={styles.services}>
            <h3>{dictionary["Services"]}</h3>
            <p dangerouslySetInnerHTML={{ __html: dictionary["Consulting and sale of modern apartments in Santa"] }} />
          </div>
          <div className={styles.content}>
            <h3>{dictionary["FollowUs"]}</h3>
            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <a className="social-links__link" href={item.url} target="_blank" title={item.name} key={index}>
                  <div className={classNames(`p-[6px] rounded-full`, socialHoverClasses[item.color])}>
                    <Icon name={item.name as IconType} className="w-4 h-4 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-30 pb-12 border-t-[1px] border-[#ffffff1a]">
          <p className="text-center">{dictionary["Kopp Suisse SRL © 2025 All rights reserved."]}</p>
        </div>
        <ScrollButton />
      </Container>
    </div>
  );
};

export default Footer;
