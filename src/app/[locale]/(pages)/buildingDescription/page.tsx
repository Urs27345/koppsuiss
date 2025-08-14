"use client";
import React from "react";
import Image from "next/image";

import { useMyContext } from "../../../context/context";

import icon2 from "@/assets/buildingDescription/1.png";
import icon3 from "@/assets/buildingDescription/2.png";
import icon4 from "@/assets/buildingDescription/3.png";
import icon5 from "@/assets/buildingDescription/4.png";
import icon6 from "@/assets/buildingDescription/5.png";
import icon7 from "@/assets/buildingDescription/6.png";
import icon8 from "@/assets/buildingDescription/7.png";
import icon9 from "@/assets/buildingDescription/8.png";
import icon10 from "@/assets/buildingDescription/9.png";
import icon11 from "@/assets/buildingDescription/10.png";
import icon12 from "@/assets/buildingDescription/11.png";
import icon13 from "@/assets/buildingDescription/12.png";
import icon14 from "@/assets/buildingDescription/13.png";
import icon15 from "@/assets/buildingDescription/14.png";
import icon16 from "@/assets/buildingDescription/15.png";
import icon17 from "@/assets/buildingDescription/16.png";
import icon18 from "@/assets/buildingDescription/17.png";
import icon19 from "@/assets/buildingDescription/18.png";
import icon20 from "@/assets/buildingDescription/19.png";
import icon21 from "@/assets/buildingDescription/20.png";
import icon22 from "@/assets/buildingDescription/21.png";
import icon23 from "@/assets/buildingDescription/22.png";
import icon24 from "@/assets/buildingDescription/23.png";
import icon25 from "@/assets/buildingDescription/24.png";
import icon26 from "@/assets/buildingDescription/25.png";
import icon27 from "@/assets/buildingDescription/26.png";
import icon28 from "@/assets/buildingDescription/27.png";
import icon29 from "@/assets/buildingDescription/28.png";
import icon30 from "@/assets/buildingDescription/29.png";
import icon31 from "@/assets/buildingDescription/30.png";
import icon32 from "@/assets/buildingDescription/31.png";
import icon33 from "@/assets/buildingDescription/32.png";
import icon34 from "@/assets/buildingDescription/33.png";
import icon35 from "@/assets/buildingDescription/34.png";
import PageMeta from "../../../../components/module/pageMeta";

import styles from "./style.module.scss";

const BuildingDescription = () => {
  const { dictionary } = useMyContext();
  return (
    <div className={styles.wrapper}>
      <PageMeta
        title={dictionary["homeSeoTitle"]}
        description={dictionary["homeSeoDescription"]}
        url={dictionary["homeSeoUrl"]}
        keywords={dictionary["homeSeoKeyword"]}
        canonical={dictionary["homeSeoUrl"]}
      />
      <div className={styles.headerContent}>
        <h1 className={styles.headerLabel}>{dictionary["constructionDescription1"]}</h1>
        <p className={styles.headerDescription}>{dictionary["constructionDescription1_1"]}</p>
      </div>
      <div className={styles.content}>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon2} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle2"]}</h2>
          </div>
          <p>{dictionary["constructionDescription2"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon3} alt="icon2" className="w-6 h-2" />
            <h2>{dictionary["constructionTitle3"]}</h2>
          </div>
          <p>{dictionary["constructionDescription3"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon4} alt="icon1" className="w-6 h-4" />
            <h2>{dictionary["constructionTitle4"]}</h2>
          </div>
          <p>{dictionary["constructionDescription4"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon5} alt="icon1" className="w-6 h-2" />
            <h2>{dictionary["constructionTitle5"]}</h2>
          </div>
          <p>{dictionary["constructionDescription5"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon6} alt="icon1" className="w-6 h-4" />
            <h2>{dictionary["constructionTitle6"]}</h2>
          </div>
          <p>{dictionary["constructionDescription6"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon7} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle7"]}</h2>
          </div>
          <p>{dictionary["constructionDescription7"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon8} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle8"]}</h2>
          </div>
          <p>{dictionary["constructionDescription8"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon9} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle9"]}</h2>
          </div>
          <p>{dictionary["constructionDescription9"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon10} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle10"]}</h2>
          </div>
          <p>{dictionary["constructionDescription10"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon11} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle11"]}</h2>
          </div>
          <p>{dictionary["constructionDescription11"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon12} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle12"]}</h2>
          </div>
          <p>{dictionary["constructionDescription12"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon13} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle13"]}</h2>
          </div>
          <p>{dictionary["constructionDescription13"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon14} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle14"]}</h2>
          </div>
          <p>{dictionary["constructionDescription14"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon15} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle15"]}</h2>
          </div>
          <p>{dictionary["constructionDescription15"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon16} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle16"]}</h2>
          </div>
          <p>{dictionary["constructionDescription16"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon17} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle17"]}</h2>
          </div>
          <p>{dictionary["constructionDescription17"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon18} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle18"]}</h2>
          </div>
          <p>{dictionary["constructionDescription18"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon19} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle19"]}</h2>
          </div>
          <p>{dictionary["constructionDescription19"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon20} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle20"]}</h2>
          </div>
          <p>{dictionary["constructionDescription20"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon21} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle21"]}</h2>
          </div>
          <p>{dictionary["constructionDescription21"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon22} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle22"]}</h2>
          </div>
          <p>{dictionary["constructionDescription22"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon23} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle23"]}</h2>
          </div>
          <p>{dictionary["constructionDescription23"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon24} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle24"]}</h2>
          </div>
          <p>{dictionary["constructionDescription24"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon25} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle25"]}</h2>
          </div>
          <p>{dictionary["constructionDescription25"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon26} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle26"]}</h2>
          </div>
          <p>{dictionary["constructionDescription26"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon27} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle27"]}</h2>
          </div>
          <p>{dictionary["constructionDescription27"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon28} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle28"]}</h2>
          </div>
          <p>{dictionary["constructionDescription28"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon29} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle29"]}</h2>
          </div>
          <p>{dictionary["constructionDescription29"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon30} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle30"]}</h2>
          </div>
          <p>{dictionary["constructionDescription30"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon31} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle31"]}</h2>
          </div>
          <p>{dictionary["constructionDescription31"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon32} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle32"]}</h2>
          </div>
          <p>{dictionary["constructionDescription32"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon33} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle33"]}</h2>
          </div>
          <p>{dictionary["constructionDescription33"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon34} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle34"]}</h2>
          </div>
          <p>{dictionary["constructionDescription34"]}</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Image src={icon35} alt="icon1" className="w-6 h-6" />
            <h2>{dictionary["constructionTitle35"]}</h2>
          </div>
          <p>{dictionary["constructionDescription35"]}</p>
        </div>
      </div>
    </div>
  );
};

export default BuildingDescription;
