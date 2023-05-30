import { MouseEventHandler } from "react";
import { Color } from "~/types";

const colors = {
  Red: "bg-red-200",
  Green: "bg-green-200",
  Blue: "bg-blue-200",
  Yellow: "bg-yellow-200",
  Orange: "bg-orange-200",
  Purple: "bg-purple-200",
  Slate: "bg-slate-100 text-slate-400",
  Clear: "",
};

export default function Tag(props: TagProps) {
  let tagClass = `px-1 py-0.5 rounded text-xs ${
    colors[props.color || "Slate"]
  }`;
  return (
    <span id={props.id} className={tagClass} onClick={props.handler}>
      {props.text}
    </span>
  );
}

interface TagProps {
  id?: string;
  color?: Color;
  handler?: MouseEventHandler;
  text: string;
}
