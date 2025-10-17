import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Vitest Setup Check", () => {
  it("should recognize jest-dom matchers like .toBeInTheDocument", () => {
    // Arrange
    render(<div>Olá Mundo</div>);

    // Act
    const element = screen.getByText("Olá Mundo");

    // Assert
    // Se esta linha não mostrar um erro de tipo no seu editor, a configuração está correta!
    expect(element).toBeInTheDocument();
  });

  it("should recognize jest-dom matchers like .toBeDisabled", () => {
    // Arrange
    render(<button disabled>Click me</button>);

    // Act
    const button = screen.getByRole("button");

    // Assert
    // Se esta linha não mostrar um erro de tipo, a configuração está correta!
    expect(button).toBeDisabled();
  });
});
