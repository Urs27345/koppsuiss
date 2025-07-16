"use client";
import React from "react";

import styles from "./style.module.scss";
import Container from "../container";
import Icon from "../../ui/Icon";
import { usePathname } from "next/navigation";
import { headerNavigationList } from "../../../utils/constant";
import { useMyContext } from "../../../app/context/context";

const PageHeaderContent = () => {
  const { dictionary } = useMyContext();
  const pathName = usePathname();
  const title = headerNavigationList.find((item) => pathName.includes(item.link))?.label ?? "floorPlan";
  return (
    <div className={styles.wrapper}>
      <Container className="flex flex-col tablet:flex-row items-center justify-between gap-4 tablet:gap-0">
        <h1>{dictionary[title]}</h1>
        <div className="flex items-center">
          <a href="/" className="text-green">
            {dictionary["home"]}
          </a>
          <Icon name="ArrowRight" className="text-secondaryGray w-4 h-4" />
          <p className="text-secondaryGray">{dictionary[title]}</p>
        </div>
      </Container>
    </div>
  );
};

export default PageHeaderContent;
