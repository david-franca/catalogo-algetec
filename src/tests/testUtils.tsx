import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ComponentType, PropsWithChildren } from "react";
function customRender(ui: React.ReactElement, { ...options } = {}) {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return <div>{children}</div>;
  };

  return render(ui, { wrapper: Wrapper as ComponentType, ...options });
}

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    render: { ...customRender(jsx) },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { setup };
