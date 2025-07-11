import React from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";

const Mail = dynamic<{ className?: string }>(() => import("./icons/mail.svg"));
const Phone = dynamic<{ className?: string }>(
  () => import("./icons/phone.svg")
);
const Facebook = dynamic<{ className?: string }>(
  () => import("./icons/facebook.svg")
);
const Instagram = dynamic<{ className?: string }>(
  () => import("./icons/instagram.svg")
);
const ArrowTop = dynamic<{ className?: string }>(
  () => import("./icons/arrowTop.svg")
);

export type IconType = "Mail" | "Phone" | "Facebook" | "Instagram" | "ArrowTop";

type IconProps = {
  name: IconType | undefined;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  if (!name) {
    return null;
  }

  const icons = {
    Mail,
    Phone,
    Instagram,
    Facebook,
    ArrowTop,
  };
  const CurrentIcon = icons[name];

  return <CurrentIcon className={classNames("w-auto h-auto", className)} />;
};

export default Icon;
