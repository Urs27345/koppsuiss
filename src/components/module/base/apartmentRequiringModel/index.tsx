"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import styles from "./styles.module.scss";
import { useMyContext } from "../../../../app/context/context";
import { useEffect, useState } from "react";
import { interpolate } from "../../../../lib/getDictionary";
import { useForm } from "react-hook-form";
import InputBox from "../../../ui/inputBox";
import { Oval } from "react-loader-spinner";

type Props = {
  roomNumber: string;
};

export const ApartmentRequiringModal: React.FC<Props> = ({ roomNumber }) => {
  const { dictionary } = useMyContext();
  const [greetingMessage, setGreetingMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    // setIsLoading(true);
    // try {
    //   const result = await sendMail({ from: data.email, subject: data.firstName, text: data.message });
    //   console.log("result", result);
    // } catch (error) {
    //   console.log("error", error);
    // }
    // setIsLoading(false);
    // console.log("Form Data Submitted:", data);
  };

  useEffect(() => {
    if (!!dictionary["greeting"]) {
      setGreetingMessage(interpolate(dictionary["greeting"], { floorNumber: roomNumber }));
    }
  }, [dictionary]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={styles.button}>{dictionary["enquireAboutThisApartment"]}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className={styles.greetingMessage}>{greetingMessage}</DialogTitle>
        </DialogHeader>
        <div className={styles.form}>
          <DialogDescription></DialogDescription>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
            className={"flex flex-1 flex-col gap-2"}
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
            <div>
              <div>
                <label htmlFor="address">{dictionary["address"]}</label>
                <span>*</span>
                <InputBox register={register("address")} type="address" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="phone">{dictionary["phone"]}</label>
                <span>*</span>
                <InputBox register={register("phone")} type="phone" />
              </div>
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
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
