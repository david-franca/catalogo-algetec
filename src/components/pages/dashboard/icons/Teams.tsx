import { GetProps } from "antd";
import { SVGProps } from "react";

import Icon from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

function TeamsSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Capa_1"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>{".st10{fill:#4f59ca}.st11{fill:#7b82ea}"}</style>
      <circle className="st10" cx={111.1} cy={30.2} r={13} />
      <path
        className="st10"
        d="M108.3 104.8h-2c-10.7 0-19.3-8.7-19.3-19.3V54.9c0-3.1 2.5-5.5 5.5-5.5h29.6c3.1 0 5.5 2.5 5.5 5.5v30.5c.1 10.7-8.6 19.4-19.3 19.4z"
      />
      <circle className="st11" cx={70.3} cy={24.2} r={18.7} />
      <path
        className="st11"
        d="M70.4 122.1h-3.2c-16.8 0-30.5-13.7-30.5-30.5V54.1c0-2.5 2.1-4.6 4.6-4.6h55c2.5 0 4.6 2.1 4.6 4.6v37.5c0 16.8-13.6 30.5-30.5 30.5z"
      />
      <path
        d="M59.5 97.2h-53C3 97.2.1 94.3.1 90.8V38.6c0-3.5 2.9-6.4 6.4-6.4h53c3.5 0 6.4 2.9 6.4 6.4v52.2c0 3.5-2.8 6.4-6.4 6.4z"
        fill="#4c53bb"
      />
      <path d="M29.4 52.7H19v-5.5h27.5v5.5H36.1V83h-6.6V52.7z" fill="#fff" />
      <path
        d="M66 49.5v41.2c0 3.5-2.9 6.4-6.4 6.4H37.2l1.5 5.7H65c3.5 0 6.4-2.9 6.4-6.4V49.5H66z"
        opacity={0.2}
      />
    </svg>
  );
}

function TeamsIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={TeamsSvg} {...props} />;
}

export default TeamsIcon;
