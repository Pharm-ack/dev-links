"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  className?: string;
  disable?: boolean;
  state?: boolean;
};

function SubmitButton({
  label,
  pendingLabel,
  className,
  disable,
  state,
}: SubmitButtonProps) {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      className={className}
      disabled={status.pending || disable || state}
    >
      {status.pending || state ? pendingLabel : label}
    </Button>
  );
}

export default SubmitButton;
