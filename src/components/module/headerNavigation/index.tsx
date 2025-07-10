"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { headerNavigationList } from "../../../utils/constant";
import Container from "../container";
import classNames from "classnames";

const HeaderNavigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <nav className="bg-white py-3 sticky top-0">
      <Container className="flex">
        {headerNavigationList.map((item, index) => (
          <div className="mr-10" key={index}>
            <button
              className={classNames(
                !!pathName.includes(item.link)
                  ? "text-green"
                  : "text-thirdGray",
                "py-3.5 block font-semibold text-lg leading-5 hover:text-green"
              )}
              onClick={() => {
                router.push(item.link);
              }}
            >
              {item.label}
            </button>
          </div>
        ))}
      </Container>
    </nav>
  );
};

export default HeaderNavigation;
