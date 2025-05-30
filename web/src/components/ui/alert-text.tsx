import { WarningIcon } from "@phosphor-icons/react";

type AlertTextProps = {
  text: string;
};

export function AlertText({ text }: AlertTextProps) {
  return (
    <span className="flex items-start gap-2">
        <WarningIcon size={16} className="fill-danger" />
        <p className="text-sm text-grayscale-500">{text}</p>
      </span>
  )
}