import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${isDark ? "is-dark" : "is-light"} ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon-wrap" aria-hidden="true">
        {isDark ? (
          <Sun className="theme-icon theme-icon--sun" size={16} />
        ) : (
          <Moon className="theme-icon theme-icon--moon" size={16} />
        )}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
