import { Image } from "antd";
import { ImageFieldProps } from "../../../types/fields";

/**
 * This field is used to display images and uses {@link https://ant.design/components/image/#header `<Image>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/image} for more details.
 */
export function ImageField({ value, imageTitle, ...rest }: ImageFieldProps) {
  return <Image {...rest} src={value} title={imageTitle} />;
}
