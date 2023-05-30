import { MouseEventHandler, ReactElement } from "react";
import { Color } from "./Color";

const colors = {
  Red: "hover:bg-red-100 bg-red-200 border-red-200",
  Green: "hover:bg-lime-400 bg-lime-300 border-lime-300",
  Blue: "hover:bg-blue-100 bg-blue-200 border-blue-200",
  Yellow: "hover:bg-yellow-100 bg-yellow-200 border-yellow-200",
  Orange: "hover:bg-orange-100 bg-orange-200 border-orange-200",
  Purple: "hover:bg-purple-100 bg-purple-200 border-purple-200",
  Gray: "hover:bg-zinc-100 bg-zinc-200 border-zinc-200",
  Clear: "hover:bg-zinc-100",
};

export function Button({
  id,
  color = "Gray",
  visible = true,
  handler,
  text,
}: ButtonProps) {
  const btnClass = `p-0.5 m-0.5 rounded w-[120px] border-solid border-2 flex items-center justify-center gap-6 ${
    colors[color]
  } ${visible ? "" : "hidden"}`;
  return (
    <button className={btnClass} id={id} onClick={handler}>
      {text}
    </button>
  );
}

export function IconButton({
  id,
  color = "Clear",
  visible = true,
  handler,
  icon,
}: ButtonProps) {
  const btnClass = `p-0.5 m-0.5 rounded-full w-6 h-6 flex items-center justify-center ${
    colors[color]
  } ${visible ? "" : "hidden"}`;
  return (
    <button className={btnClass} id={id} onClick={handler}>
      {icon}
    </button>
  );
}

interface ButtonProps {
  color?: Color;
  handler?: MouseEventHandler;
  id?: string;
  visible?: boolean;
  text?: string;
  icon?: ReactElement;
}
