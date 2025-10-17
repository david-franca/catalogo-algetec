import { Typography } from "antd";

import { EmailFieldProps } from "../../../types/fields";

const { Link } = Typography;

/**
 * This field is used to display email values. It uses the {@link https://ant.design/components/typography/#FAQ `<Link>`} component
 * of {@link https://ant.design/components/typography `<Typography>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/email} for more details.
 */
export function EmailField({ value, ...rest }: EmailFieldProps) {
  return (
    <Link href={`mailto:${value}`} {...rest}>
      {value}
    </Link>
  );
}
