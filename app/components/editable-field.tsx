import { ChangeEventHandler } from "react";

export default function EditableField({
  editMode,
  value,
  onChange,
  id,
  inputType,
  extraClass,
}: Props) {
  const CLASSES = "rounded-md w-64 h-7";
  const inputElement =
    inputType === "checkbox" ? (
      <input
        className={`${CLASSES} border-2 border-slate-200 ${extraClass}`}
        id={id}
        checked={value as boolean}
        type={inputType}
        onChange={onChange}
      />
    ) : (
      <input
        className={`${CLASSES} border-2 border-slate-200 ${extraClass}`}
        min="0"
        id={id}
        value={value as string}
        type={inputType}
        onChange={onChange}
      />
    );

  const readOnlyElement =
    inputType === "checkbox" ? (
      <input
        className={`${CLASSES} ${extraClass}`}
        id={id}
        checked={value as boolean}
        type={inputType}
        disabled={true}
      />
    ) : (
      <span className={`${CLASSES} ${extraClass}`}>
        {value !== undefined ? value.toString() : ""}
      </span>
    );

  return editMode ? inputElement : readOnlyElement;
}

interface Props {
  editMode: boolean;
  value: string | boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  inputType: string;
  extraClass?: string;
}
