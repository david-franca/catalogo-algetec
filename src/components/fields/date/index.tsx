import { Typography } from "antd";
import dayjs from "dayjs";

import { DateFieldProps } from "../../../types/fields";

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/date} for more details.
 */
export function DateField({
  value,
  format: dateFormat = "L",
  ...rest
}: DateFieldProps) {
  const { Text } = Typography;

  return <Text {...rest}>{value ? dayjs(value).format(dateFormat) : ""}</Text>;
}
