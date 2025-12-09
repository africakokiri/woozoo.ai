"use server";

import chalk from "chalk";

type Logger = {
  message: string;
  status?: "PASS" | "WARNING" | "ERROR";
};

const logger = ({ message, status = "PASS" }: Logger) => {
  if (process.env.PRODUCTION === "true") return;

  switch (status) {
    case "PASS":
      return console.log(`${chalk.bgHex("#00c950").black.bold(" PASS ")}${" " + message}`);
    case "WARNING":
      return console.log(`${chalk.bgHex("#ffdf20").black.bold(" WARNING ")}${" " + message}`);
    case "ERROR":
      return console.log(`${chalk.bgHex("#fb2c36").hex("#f5f5f5").bold(" ERROR ")}${" " + message}`);
  }
};

export default logger;
