import chalk from "chalk";
import dayjs from "dayjs";
import util from "node:util";

type STATUS = "PASS" | "WARNING" | "ERROR";
type Depth = number | null;

const LABEL_WIDTH = 10;

export const logger = (() => {
  const isProduction = () => process.env.PRODUCTION === "TRUE";

  const getTime = () => chalk.gray(`[${dayjs().format("HH:mm:ss")}]`);

  const buildLabel = (raw: string, colored: string) => {
    const paddingLength = LABEL_WIDTH - raw.length;
    const padding = " ".repeat(Math.max(0, paddingLength));
    return colored + padding;
  };

  const getLabel = (status: STATUS) => {
    switch (status) {
      case "PASS": {
        const raw = "PASS";
        const colored = chalk.bgHex("#00c950").black.bold(` ${raw} `);
        return buildLabel(` ${raw} `, colored);
      }
      case "WARNING": {
        const raw = "WARNING";
        const colored = chalk.bgHex("#ffdf20").black.bold(` ${raw} `);
        return buildLabel(` ${raw} `, colored);
      }
      case "ERROR": {
        const raw = "ERROR";
        const colored = chalk.hex("#f5f5f5").bgHex("#fb2c36").bold(` ${raw} `);
        return buildLabel(` ${raw} `, colored);
      }
    }
  };

  function logString(message: string, status: STATUS) {
    if (isProduction()) return;

    const time = getTime();
    const label = getLabel(status);
    console.log(`${time} ${label} ${message}`);
  }

  function logObject(obj: unknown, status: STATUS, depth: Depth = null) {
    if (isProduction()) return;

    const time = getTime();
    const label = getLabel(status);

    const formatted = util.inspect(obj, {
      depth,
      colors: true,
      compact: false
    });

    console.log(`${time} ${label}\n${formatted}`);
  }

  return {
    str(message: string, status: STATUS = "PASS") {
      logString(message, status);
    },

    pass(message: string) {
      logString(message, "PASS");
    },

    warn(message: string) {
      logString(message, "WARNING");
    },

    error(message: string) {
      logString(message, "ERROR");
    },

    obj(obj: unknown, status: STATUS = "PASS", depth: Depth = null) {
      logObject(obj, status, depth);
    },

    passObj(obj: unknown, depth: Depth = null) {
      logObject(obj, "PASS", depth);
    },

    warnObj(obj: unknown, depth: Depth = null) {
      logObject(obj, "WARNING", depth);
    },

    errorObj(obj: unknown, depth: Depth = null) {
      logObject(obj, "ERROR", depth);
    }
  };
})();
