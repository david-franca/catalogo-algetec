import { Button, Popover } from "antd";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, useMemo } from "react";

import { useTheme } from "@/hooks";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

type ToolbarButtonProps = {
  title: string;
  icon:
    | ForwardRefExoticComponent<Omit<AntdIconProps, "ref">>
    | ForwardRefExoticComponent<LucideProps>;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
};

export function ToolbarButton({
  title,
  icon: Icon,
  isActive,
  onClick,
  disabled,
}: ToolbarButtonProps) {
  const { theme } = useTheme();

  const color = useMemo(() => {
    if (isActive || theme === "dark") {
      return "white";
    }
    return "black";
  }, [isActive, theme]);

  return (
    <Popover content={title}>
      <Button
        type={isActive ? "primary" : "default"}
        icon={<Icon width={16} height={16} color={disabled ? "gray" : color} />}
        onClick={onClick}
        disabled={disabled}
      />
    </Popover>
  );
}
