import React from "react";
import { useTheme } from "../contexts/ThemeContext";

interface BrandLogoProps {
  className?: string;
  alt?: string;
  forceTheme?: "light" | "dark";
  width?: number | string;
  height?: number | string;
}

export function BrandLogo({
  className = "",
  alt = "HSL Logo",
  forceTheme,
  width,
  height,
}: BrandLogoProps) {
  const { theme } = useTheme();
  const activeTheme = forceTheme || theme;
  const logoSrc = activeTheme === "dark" ? "/assets/hsl3.webp" : "/assets/hsl2.webp";

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`brand-logo-img ${className}`}
      width={width}
      height={height}
    />
  );
}

export default BrandLogo;
