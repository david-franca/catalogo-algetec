import { Popover, Tag, Typography } from "antd";

import { TagFieldProps } from "../../../types/fields";

/**
 * This field lets you display a value in a tag. It uses Ant Design's {@link https://ant.design/components/tag/ `<Tag>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/tag} for more details.
 */
export function TagField({ value, ...rest }: TagFieldProps) {
  return (
    <Popover content={value}>
      <Tag className="max-w-sm" {...rest}>
        <Typography.Text
          ellipsis
          style={{
            color: "inherit",
          }}
        >
          {value}
        </Typography.Text>
      </Tag>
    </Popover>
  );
}
