import { Input, InputProps } from "antd";
import { useEffect, useState } from "react";

export function DebounceInput({
  value: initialValue,
  onChange,
  search = false,
  debounce = 500,
  ...props
}: {
  value?: string;
  onChange: (value?: string) => void;
  search?: boolean;
  number?: boolean;
  debounce?: number;
} & Omit<InputProps, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (search) {
    return (
      <Input.Search
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
