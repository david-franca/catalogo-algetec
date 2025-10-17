import { Progress } from "antd";

interface ProgressProps {
  value?: number;
}
export function ProgressBar({ value }: ProgressProps) {
  return <Progress percent={value || 0} />;
}
