import { PropsWithChildren } from "react";

export interface LogoIconProps extends PropsWithChildren {
  iconPath: string;
}
export const LogoIcon = (props: LogoIconProps) => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src={props.iconPath} alt="GitHub" className="h-6 w-6" />{" "}
      {props.children}
    </a>
  );
};
