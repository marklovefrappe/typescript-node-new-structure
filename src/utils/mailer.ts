import nodemailer, { SendMailOptions } from "nodemailer";
import logger from "./logger";
import configs from "../configs/configs";

// const createCredential = async () => {
//     const credential = await nodemailer.createTestAccount();
//     logger.info(credential);
// };

const smtp = configs.smtp;

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err, "Error sending email");
      return;
    }
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};

export default sendEmail;
