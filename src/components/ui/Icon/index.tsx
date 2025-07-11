import React from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";

const Mail = dynamic<{ className?: string }>(() => import("./icons/mail.svg"));
const Phone = dynamic<{ className?: string }>(() => import("./icons/phone.svg"));
const Facebook = dynamic<{ className?: string }>(() => import("./icons/facebook.svg"));
const Twitter = dynamic<{ className?: string }>(() => import("./icons/twitter.svg"));
const Instagram = dynamic<{ className?: string }>(() => import("./icons/instagram.svg"));
const Linkedin = dynamic<{ className?: string }>(() => import("./icons/linkedin.svg"));
const ArrowTop = dynamic<{ className?: string }>(() => import("./icons/arrowTop.svg"));
const ArrowLeft = dynamic<{ className?: string }>(() => import("./icons/arrowLeft.svg"));
const ArrowRight = dynamic<{ className?: string }>(() => import("./icons/arrowRight.svg"));

export type IconType =
  | "Mail"
  | "Phone"
  | "Facebook"
  | "Twitter"
  | "Instagram"
  | "Linkedin"
  | "ArrowTop"
  | "ArrowLeft"
  | "ArrowRight";

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
    Twitter,
    Linkedin,
    ArrowTop,
    ArrowLeft,
    ArrowRight,
  };
  const CurrentIcon = icons[name];

  return <CurrentIcon className={classNames(className)} />;
};

export default Icon;
