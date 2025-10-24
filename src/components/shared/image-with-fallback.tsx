import React, { useState } from "react";

import logoDark from "@/assets/dark.png";
import logoLight from "@/assets/light.png";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Classes CSS para o container do fallback, útil para estilizar o fundo.
   */
  fallbackContainerClassName?: string;
}

/**
 * Um componente de imagem que exibe um fallback (o logo da aplicação)
 * caso a imagem principal (src) não seja fornecida ou falhe ao carregar.
 *
 * @param {ImageWithFallbackProps} props As propriedades do componente de imagem.
 * @returns {React.ReactElement} O elemento de imagem ou seu fallback.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackContainerClassName,
  ...props
}: ImageWithFallbackProps): React.ReactElement => {
  // Inicia com erro se a 'src' já for nula/undefined.
  const [hasError, setHasError] = useState(!src);
  const { theme } = useTheme();
  const fallbackLogo = theme === "dark" ? logoLight : logoDark;

  // Se a imagem principal falhar ao carregar, atualiza o estado para exibir o fallback.
  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          fallbackContainerClassName
        )}
      >
        <img
          src={fallbackLogo}
          alt={alt}
          className={cn(className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={cn("rounded-2xl", className)}
      {...props}
    />
  );
};
