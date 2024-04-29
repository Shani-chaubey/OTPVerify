import { generate } from "otp-generator";
import Otp from "../model/otpModel.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const userLogin = async (req, res, next) => {
  const { number } = req.body;

  const otp = generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const expires = Date.now() + 15 * 60 * 1000;

  await Otp.findOneAndUpdate(
    { number },
    { otp, expireAt: expires },
    { new: true, upsert: true }   
  );

  await client.messages       
    .create({
      body: `Your otp is : ${otp}`,
      to: number, // Text your number
      from: process.env.TWILLIO_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.id));

  res.status(200).send({
    otp: otp,
    message: "OTP sent Successfully",
  });
};
