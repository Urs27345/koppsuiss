"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "../container";
import styles from "./style.module.scss";
import Icon, { IconType } from "../../ui/Icon";
import { socialLinks } from "../../../utils/constant";

const Header = () => {
  return (
    <div className="py-5.5 bg-black">
      <Container className="flex flex-col tablet:flex-row items-center justify-between gap-4 tablet:gap-0">
        <Link href="/">
          <Image src={"/logo.png"} alt="Logo" width={200} height={51} priority />
        </Link>
        <div className="flex flex-col tablet:flex-row items-center justify-between gap-2 tablet:gap-10">
          <div className={styles.socials}>
            {socialLinks.map((item, index) => (
              <a className="social-links__link" href={item.url} target="_blank" title={item.name} key={index}>
                <div className="bg-white p-[6px] rounded-full">
                  <Icon name={item.name as IconType} className="w-4 h-4 text-black hover:text-green" />
                </div>
              </a>
            ))}
          </div>
          <div className={styles.contact}>
            <a className="flex items-center gap-2" href="tel:+591 71634174">
              <Icon name="Phone" className="w-7 h-7 text-blue" />
              <p>+591 71634174</p>
            </a>
            <a className="flex items-center gap-2" href="mailto:casa@koppsuisse.ch">
              <Icon name="Mail" className="w-7 h-7 text-blue" />
              <p>casa@koppsuisse.ch</p>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
