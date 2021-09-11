import * as React from "react";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.scss";
interface Type {
  d?: string;
  transition?: {
    duration: number;
  };
  variants: {
    open: {
      d?: string;
      opacity?: number;
      stroke?: string;
    };
    closed: {
      d?: string;
      opacity?: number;
      stroke?: string;
    };
  };
}
const Path = (props: Type) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

export const NavBtn = ({ toggle }: any) => (
  <button className={styles.button} onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 5.5 L 20 5.5", stroke: "#ff4757" },
          open: { d: "M 3 19.5 L 17 5.5", stroke: "#57606f" },
        }}
      />
      <Path
        d="M 2 12.423 L 20 12.423"
        variants={{
          closed: { opacity: 1, stroke: "#7bed9f" },
          open: { opacity: 0, stroke: "#e74c3c" },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 19.346 L 20 19.346", stroke: "#5352ed" },
          open: { d: "M 3 5.5 L 17 19.346", stroke: "#57606f" },
        }}
      />
    </svg>
  </button>
);
