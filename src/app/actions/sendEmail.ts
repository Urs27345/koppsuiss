"use server";
import nodemailer from "nodemailer";

interface CustomTransportOptions extends nodemailer.TransportOptions {
  host?: string;
}
export interface emailData {
  packageName: string;
  packageImage: string;
  pickupStreet: string;
  pickupCity: string;
  dropOffStreet: string;
  dropOffCity: string;
  preferredPickup?: string;
  preferredDelivery?: string;
  deliveredOn?: string;
  domain: string;
  trado_support_email: string;
  fee?: number;
  _id: string;
}

function createMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT ?? 0),
    secure: process.env.SMTP_PORT == "465",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  } as CustomTransportOptions);
}

const mailTransporter = createMailTransporter();

export const sendMail = async ({
  from,
  cc,
  subject,
  text,
}: {
  from: string;
  cc?: string[];
  subject: string;
  text: string;
}) => {
  try {
    // if (process.env.NODE_ENV === 'PROD') {
    await mailTransporter
      .sendMail({
        from, // sender address
        to: "darkhorse0623@gmail.com", // list of receivers
        cc,
        subject, // Subject line
        text, // plain text body
        html: `<p>${text.split("\n").join("<br>")}</p>`, // html body
      })
      .catch((error) => console.error({ err: error, msg: "Email service error" }));
    // }
  } catch (error) {
    console.error({ err: error, msg: "Email sending error" });
  }
};
