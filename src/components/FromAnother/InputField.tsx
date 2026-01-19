import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full"}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
          error 
            ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300"
        }`}
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
