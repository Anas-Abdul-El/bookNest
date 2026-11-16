import type { ReactNode } from "react";
import { errorId } from "../../utils/form";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  // Extra content on the right of the label, e.g. a character counter.
  labelExtra?: ReactNode;
  // The input, select or textarea. Give it fieldErrorProps(id, error).
  children: ReactNode;
};

// A label, a form control and its error message.
function FormField({ id, label, error, labelExtra, children }: FormFieldProps) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        {labelExtra}
      </div>
      {children}
      {error && (
        <p id={errorId(id)} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
