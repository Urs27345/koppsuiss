"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { headerNavigationList } from "../../../utils/constant";
import Container from "../container";
import Icon from "../../ui/Icon";
import SelectLanguageBox from "../base/SelectLanguageBox";
import { useMyContext } from "../../../app/context/context";

const HeaderNavigation = ({ dict, locale }: { dict: any; locale: string }) => {
  const { setDictionary } = useMyContext();
  const pathName = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setDictionary(dict);
  }, [dict]);

  return (
    <>
      <nav className="bg-white py-3 sticky top-0 z-50 hidden tablet:block">
        <Container className="flex flex-wrap items-center">
          {headerNavigationList.map((item, index) => (
            <div className="mr-10" key={index}>
              <button
                className={classNames(
                  !!pathName.includes(item.link) ? "text-green" : "text-thirdGray",
                  "py-3.5 block font-semibold text-lg leading-5 hover:text-green",
                )}
                onClick={() => {
                  router.push(`/${locale}/${item.link}`);
                }}
              >
                {dict[item.label]}
              </button>
            </div>
          ))}
          <div>
            <SelectLanguageBox />
          </div>
        </Container>
      </nav>
      <div>
        <button
          className="absolute w-[30px] h-fit right-5 top-2 block tablet:hidden"
          onClick={() => {
            setActive((prev) => !prev);
          }}
        >
          <Icon name="Hamburger" className="text-white" />
        </button>
        <nav
          className={classNames(
            "block tablet:hidden absolute top-10 right-5 max-w-[200px] bg-white overflow-hidden transition-all duration-150 ease-in-out rounded-md p-4",
            active ? " opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {headerNavigationList.map((item, index) => (
            <div className="" key={index}>
              <button
                className={classNames(
                  !!pathName.includes(item.link) ? "text-green" : "text-thirdGray",
                  "py-1 text-left font-medium text-base leading-5 hover:text-green",
                )}
                onClick={() => {
                  router.push(`/${locale}/${item.link}`);
                }}
              >
                {dict[item.label]}
              </button>
            </div>
          ))}
          <SelectLanguageBox />
        </nav>
      </div>
    </>
  );
};

export default HeaderNavigation;
