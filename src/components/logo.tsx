import { motion } from "framer-motion";
import { LogoIcon } from "./logo-icon.tsx";

export interface LogoProps {
  iconPath: string;
  name: string;
}
export const Logo = (props: LogoProps) => {
  return (
    <LogoIcon iconPath={props.iconPath}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {props.name}
      </motion.span>
    </LogoIcon>
  );
};
