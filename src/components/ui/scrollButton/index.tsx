"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./style.module.scss";
import Icon from "../Icon";

const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={classNames(styles.wrapper, {
        hidden: !visible,
        flex: visible,
      })}
      onClick={scrollToTop}
    >
      <Icon name="ArrowTop" className="text-white w-5 h-5" />
    </button>
  );
};

export default ScrollButton;
