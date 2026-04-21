import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-card-bg border border-font-muted/20 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 transition-all duration-500 transform ${
            isLight
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0 text-accent"
          } text-accent`}
        />
        <Moon
          className={`absolute inset-0 transition-all duration-500 transform ${
            isLight
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-font-muted"
          } group-hover:text-accent`}
        />
      </div>
    </button>
  );
};
