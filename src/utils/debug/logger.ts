"use server";

import chalk from "chalk";

type Logger = {
  message: unknown | string;
  status?: "PASS" | "WARNING" | "ERROR";
};

const logger = ({ message, status = "PASS" }: Logger) => {
  if (process.env.PRODUCTION === "true") return;

  // switch 문 내부의 'return'을 제거합니다.
  switch (status) {
    case "PASS":
      console.log(`${chalk.bgHex("#00c950").black.bold(" PASS ")}${" " + message}`);
      break; // switch 문 종료를 위해 break를 사용합니다.
    case "WARNING":
      console.log(`${chalk.bgHex("#ffdf20").black.bold(" WARNING ")}${" " + message}`);
      break;
    case "ERROR":
      console.log(`${chalk.bgHex("#fb2c36").hex("#f5f5f5").bold(" ERROR ")}${" " + message}`);
      break;
  }
};

export default logger;
