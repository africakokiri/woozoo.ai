import { type Variants } from "motion";

export const motionVars: Variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};
