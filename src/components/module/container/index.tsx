import React, { ReactNode } from "react";

import styles from "./style.module.scss";
import classNames from "classnames";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>{children}</div>
  );
};

export default Container;
