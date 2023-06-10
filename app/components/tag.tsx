import { MouseEventHandler } from "react";

export default function Tag(props: TagProps) {
  let tagClass = `badge badge-accent`;
  return (
    <span id={props.id} className={tagClass} onClick={props.handler}>
      {props.text}
    </span>
  );
}

interface TagProps {
  id?: string;
  handler?: MouseEventHandler;
  text: string;
}
