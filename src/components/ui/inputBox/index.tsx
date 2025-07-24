import React from "react";

import styles from "./style.module.scss";

type Props = {
  className?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  register?: any;
};

const InputBox: React.FC<Props> = ({ type = "text", placeholder, register = {}, ...props }) => {
  return <input type={type} placeholder={placeholder} className={styles.input} {...register} {...props} />;
};

export default InputBox;
