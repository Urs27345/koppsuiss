import React from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "../container";
import styles from "./style.module.scss";

const Header = () => {
  return (
    <div className="py-5.5 bg-black">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={200}
            height={51}
            priority
          />
        </Link>
        <div className="flex items-center">
          <div className="socials">
            <a
              className="social-links__link"
              href="https://www.facebook.com/cPanel"
              target="_blank"
              title="Facebook"
            >
              <span className="icon">
                <Image
                  src="https://koppsuisse.ch/wp-content/maintenance/assets/images/facebook.svg"
                  alt="Facebook"
                  width={25}
                  height={25}
                />
              </span>
            </a>
          </div>
          <div className={styles.contact}>
            <div className="phone">
              <p>+591 71634174</p>
            </div>
            <div className="mail">
              <p>casa@koppsuisse.ch</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
