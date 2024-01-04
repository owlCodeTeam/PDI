import { emailGatewayInterface, emailInputSend } from "@domain/user/emailGateway.interface";
import * as nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAILADMIN,
    pass: process.env.EMAILPASSWORD,
  },
});
export class emailGatewayLocal implements emailGatewayInterface {
  async send(emailInput: emailInputSend): Promise<void> {
    const mailOptions = {
      from: emailInput.from,
      to: emailInput.to,
      subject: emailInput.subject,
      text: emailInput.text,
      html: "",
    };
    if (emailInput.html) {
      mailOptions.html = emailInput.html;
    }
    await transporter.sendMail(mailOptions);
  }
}
