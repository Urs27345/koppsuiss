"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

import InputBox from "../../../ui/inputBox";

import styles from "./style.module.scss";
import { useMyContext } from "../../../../app/context/context";
import { sendMail } from "../../../../app/actions/sendEmail";

const ContactForm = () => {
  const { control, register, handleSubmit } = useForm();
  const { dictionary } = useMyContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const result = await sendMail({ from: data.email, subject: data.firstName, text: data.message });
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className={styles.wrapper}>
      <h2>{dictionary["ContactUs"]}</h2>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        className={styles.form}
      >
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label htmlFor="firstName">{dictionary["firstName"]}</label>
            <span>*</span>
            <InputBox register={register("firstName")} />
          </div>
          <div>
            <label htmlFor="lastName">{dictionary["lastName"]}</label>
            <span>*</span>
            <InputBox register={register("lastName")} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <label htmlFor="email">{dictionary["email"]}</label>
            <span>*</span>
            <InputBox register={register("email")} type="email" />
          </div>
        </div>
        <div>
          <label htmlFor="message">{dictionary["message"]}</label>
          <span>*</span>
          <Controller
            name="message"
            control={control}
            render={({ field }) => <textarea {...field} required className={styles.messageContext}></textarea>}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? (
            <Oval
              visible={true}
              height="25"
              width="25"
              color="white"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              strokeWidth="4"
              secondaryColor="white"
            />
          ) : (
            dictionary["submit"]
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
