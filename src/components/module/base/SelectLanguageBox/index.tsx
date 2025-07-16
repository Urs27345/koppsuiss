"use client";
import React, { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "../../../ui/Icon";
import { useParams, usePathname, useRouter } from "next/navigation";
import { replaceLocale } from "../../../../lib/function";

const SelectLanguageBox = () => {
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const initialLoaded = useRef<any>(false);
  const [selectedValue, setSelectedValue] = useState("de");

  useEffect(() => {
    setSelectedValue(params.locale as string);
    initialLoaded.current = true;
  }, [params.locale]);

  useEffect(() => {
    if (!!initialLoaded) {
      const newPath = replaceLocale(pathName, selectedValue);
      router.replace(newPath);
      router.refresh();
    }
  }, [selectedValue]);

  return (
    <Select
      value={selectedValue}
      onValueChange={(e) => {
        setSelectedValue(e);
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="DE" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="de">
          <div className="flex gap-2 items-center">
            <Icon name="Germany" className="w-5 h-5" />
            <p>Deutsch</p>
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex gap-2 items-center">
            <Icon name="English" className="w-5 h-5" />
            <p>English</p>
          </div>
        </SelectItem>
        <SelectItem value="es">
          <div className="flex gap-2 items-center">
            <Icon name="Mexico" className="w-5 h-5" />
            <p>Español</p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguageBox;
