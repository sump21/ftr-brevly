import { AlertText } from "./alert-text";

type BaseInputProps = {
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

type RegularInputProps = BaseInputProps & {
  type: string;
  placeholder?: string;
  prefix?: never;
};

type PrefixInputProps = BaseInputProps & {
  prefix: string;
  type?: never;
  placeholder?: never;
};

type InputProps = RegularInputProps | PrefixInputProps;

export function Input({
  error,
  disabled = false,
  value,
  onChange,
  className = "",
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  if ('prefix' in props && props.prefix) {
    return (
      <div>
        <div className={`flex items-center border border-grayscale-300 rounded-md px-4 mb-2 focus-within:ring-2 focus-within:ring-blue-base ${
          error ? "border-danger" : ""
        } ${className}`}>
          <span className="text-grayscale-400">{props.prefix}</span>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className="w-full h-12 outline-none border-none bg-transparent disabled:opacity-50"
          />
        </div>
        {error && <AlertText text={error} />}
      </div>
    );
  }

  // Input regular
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full h-12 border border-grayscale-300 rounded-lg p-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-base placeholder:text-grayscale-400 disabled:opacity-50 ${
          error ? "border-danger" : ""
        } ${className}`}
      />
      {error && <AlertText text={error} />}
    </div>
  );
}
