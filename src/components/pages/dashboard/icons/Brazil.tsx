import { GetProps } from "antd";
import { SVGProps } from "react";

import Icon from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

function BrazilSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 64 42"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="M5.8 0h52.3C61.4 0 64 2.6 64 5.7v30.6c0 3.2-2.6 5.7-5.8 5.7H5.8C2.6 42 0 39.4 0 36.3V5.7C0 2.6 2.6 0 5.8 0z"
        fill="#008f3e"
      />
      <path d="M4 21L32 0l28 21-28 21L4 21z" fill="#f8c300" />
      <ellipse cx={32} cy={21} rx={13.9} ry={14} fill="#28166f" />
      <path
        d="M44.5 28c.4-.8.7-1.7.9-2.6-4.2-9.6-15.3-14-24.8-9.8l-1.2.6c-.3.7-.6 1.4-.8 2.1 9.3-4.7 20.6-1 25.3 8.4.2.4.4.8.6 1.3z"
        fill="#fff"
      />
    </svg>
  );
}

function BrazilIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={BrazilSvg} {...props} />;
}

export default BrazilIcon;
