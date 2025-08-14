"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { apartmentDetails, floorOverview } from "../../../utils/constant";
import image010 from "@/assets/department/010.jpg";
import image020 from "@/assets/department/020.jpg";
import image003 from "@/assets/department/003.jpg";
import image101 from "@/assets/department/101.jpg";
import image102 from "@/assets/department/102.jpg";
import image103 from "@/assets/department/103.jpg";
import image104 from "@/assets/department/104.jpg";
import image105 from "@/assets/department/105.jpg";
import image106 from "@/assets/department/106.jpg";
import image201 from "@/assets/department/201.jpg";
import image202 from "@/assets/department/202.jpg";
import image203 from "@/assets/department/203.jpg";
import image204 from "@/assets/department/204.jpg";
import image301 from "@/assets/department/301.jpg";
import image302 from "@/assets/department/302.jpg";
import image303 from "@/assets/department/303.jpg";
import image304 from "@/assets/department/304.jpg";
import image305 from "@/assets/department/305.jpg";
import image306 from "@/assets/department/306.jpg";
import image401 from "@/assets/department/401.jpg";
import image402 from "@/assets/department/402.jpg";
import image403 from "@/assets/department/403.jpg";
import image404 from "@/assets/department/404.jpg";
import image501 from "@/assets/department/501.jpg";
import image502 from "@/assets/department/502.jpg";
import image503 from "@/assets/department/503.jpg";
import image504 from "@/assets/department/504.jpg";
import image505 from "@/assets/department/505.jpg";
import image506 from "@/assets/department/506.jpg";

import Container from "../../module/container";
import Configurator from "../../module/configurator";
import { useMyContext } from "../../../app/context/context";
import { ApartmentRequiringModal } from "../../module/base/apartmentRequiringModel";
import PageMeta from "../../module/pageMeta";

import styles from "./style.module.scss";

type Props = {
  id: string;
};

const Department: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { locale } = useParams();
  const { dictionary } = useMyContext();
  const [hoveredRoom, setHoveredRoom] = useState<string>();

  const floorNumber = id.substring(0, 1);
  const departmentImage: { [key: string]: any } = {
    image001: image010,
    image002: image020,
    image003: image003,
    image101: image101,
    image102: image102,
    image103: image103,
    image104: image104,
    image105: image105,
    image106: image106,
    image201: image201,
    image202: image202,
    image203: image203,
    image204: image204,
    image301: image301,
    image302: image302,
    image303: image303,
    image304: image304,
    image305: image305,
    image306: image306,
    image401: image401,
    image402: image402,
    image403: image403,
    image404: image404,
    image501: image501,
    image502: image502,
    image503: image503,
    image504: image504,
    image505: image505,
    image506: image506,
  };

  const hoverStyleList: { [key: string]: string } = {
    pink: "hover:bg-[#F2DCDA]",
    green: "hover:bg-[#92D050]",
    gray: "hover:bg-secondaryGray/30",
    brown: "hover:bg-[#C4BD97]",
  };

  // const greeting = interpolate(dictionary["greeting"], { floorNumber: "123" });

  return (
    <Container>
      <PageMeta
        title={dictionary["departmentSeoTitle"]}
        description={dictionary["departmentSeoDescription"]}
        url={dictionary["departmentSeoUrl"]}
        keywords={dictionary["departmentSeoKeyword"]}
        canonical={dictionary["departmentSeoUrl"]}
      />
      <div className={styles.wrapper}>
        <div className={classNames(styles.content, "tablet:max-w-[450px]")}>
          <div>
            <h1>{dictionary["visualization"]}</h1>
            <Configurator hoveredRoom={hoveredRoom} />
          </div>
          <div className="mt-4">
            <h2>{dictionary["apartmentDetails"]}</h2>
            <div className={styles.apartmentContent}>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["type"]}:</p>
                <p className={styles.value}>
                  {apartmentDetails?.[id]?.type} {dictionary["bedroom"]}
                </p>
              </div>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["livingSpace"]}:</p>
                <p className={styles.value}>{apartmentDetails?.[id]?.livingSpace} m²</p>
              </div>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["balcony"]}:</p>
                <p className={styles.value}>{apartmentDetails?.[id]?.balcony} m²</p>
              </div>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["totalArea"]}:</p>
                <p className={styles.value}>
                  {floorNumber}st {dictionary["floor"]}
                </p>
              </div>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["elevator"]}:</p>
                <p className={styles.value}>{apartmentDetails?.[id]?.elevator}</p>
              </div>
              <div className={styles.detailsRow}>
                <p className={styles.label}>{dictionary["price"]}:</p>
                <p className={styles.value}>USD {apartmentDetails?.[id]?.price}.–</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles.content, "flex-auto")}>
          <h2>
            {dictionary["floorPlanApartment"]} {id}
          </h2>
          <div>
            <Image src={departmentImage[`image${id}`]} alt={`image${id}`} className="w-full" />
          </div>
        </div>
        <div className={classNames(styles.content, "max-w-[350px]")}>
          <h2>{dictionary["floorOverview"]}</h2>
          <div className={styles.overviewWrapper}>
            {floorOverview.map((item, index) => (
              <Fragment key={index}>
                <p
                  role="button"
                  onClick={() => {
                    router.push(`${item.floor}01`);
                  }}
                  className={classNames(styles.floorRow, item.floor.toString() === floorNumber ? styles.active : "")}
                >
                  {item.floor === 0
                    ? dictionary["basement"]
                    : `${item.label}
                  ${dictionary["floor"]}`}
                </p>
                {item.floor.toString() === floorNumber && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>{dictionary["no"]}</div>
                      <div>{dictionary["room"]}</div>
                      <div>{dictionary["salesPrice"]}</div>
                    </div>
                    {item.room?.map((room, roomIndex) => (
                      <Link
                        key={roomIndex}
                        href={`/${locale}/planos/${room.no}`}
                        className={classNames(
                          `flex items-center border-b border-gray-200 py-2 px-1`,
                          hoverStyleList[item?.color ?? "green"],
                        )}
                        onMouseOver={() => {
                          if (hoveredRoom !== room.no) {
                            setHoveredRoom(room.no);
                          }
                        }}
                      >
                        <span className="w-full max-w-[100px]">{room.no === "003" ? "Oficina" : room.no}</span>
                        <span className="w-full max-w-[20px]">{room.type}</span>
                        <span className="flex-1 text-end">USD {room.price}</span>
                      </Link>
                    ))}
                  </div>
                )}
                <div></div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomContent}>
        <ApartmentRequiringModal roomNumber={id} />
        <Link href={`/pdf/${id}.pdf`} target="_blank" className={styles.additionalButton}>
          {dictionary["floorPlanAsPDF"]}
        </Link>
        <Link href={`/price/${id}.pdf`} className={styles.additionalButton} target="_blank">
          {dictionary["completePriceList"]}
        </Link>
        <Link href={`/${locale}/buildingDescription`} className={styles.additionalButton}>
          {dictionary["constructionDescriptionLower"]}
        </Link>
      </div>
    </Container>
  );
};

export default Department;
