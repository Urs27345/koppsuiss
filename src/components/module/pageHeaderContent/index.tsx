"use client";
import React from "react";

import styles from "./style.module.scss";
import Container from "../container";
import Icon from "../../ui/Icon";
import { usePathname } from "next/navigation";
import { headerNavigationList } from "../../../utils/constant";

const PageHeaderContent = () => {
  const pathName = usePathname();
  const title = headerNavigationList.find((item) => item.link === pathName)?.label ?? "PLANOS DE PLANTA Y PRECIOS";
  return (
    <div className={styles.wrapper}>
      <Container className="flex flex-col tablet:flex-row items-center justify-between gap-4 tablet:gap-0">
        <h1>{title}</h1>
        <div className="flex items-center">
          <a href="/" className="text-green">
            Home
          </a>
          <Icon name="ArrowRight" className="text-secondaryGray w-4 h-4" />
          <p className="text-secondaryGray">{title}</p>
        </div>
      </Container>
    </div>
  );
};

export default PageHeaderContent;
