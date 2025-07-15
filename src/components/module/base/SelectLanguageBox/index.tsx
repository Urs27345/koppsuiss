"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "../../../ui/Icon";

const SelectLanguageBox = () => {
  const [selectedValue, setSelectedValue] = useState("DE");
  return (
    <Select
      value="DE"
      onValueChange={(e) => {
        console.log(e);
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="DE" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="DE">
          <div className="flex gap-2 items-center">
            <Icon name="Germany" className="w-5 h-5" />
            <p>Deutsch</p>
          </div>
        </SelectItem>
        <SelectItem value="EN">
          <div className="flex gap-2 items-center">
            <Icon name="English" className="w-5 h-5" />
            <p>English</p>
          </div>
        </SelectItem>
        <SelectItem value="ES">
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
