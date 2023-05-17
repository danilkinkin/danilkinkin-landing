import { useState, useEffect } from "react";

function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const onChange = (event) => {
      setIsDarkMode(event.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onChange);
    };
  }, []);

  return isDarkMode;
}

export default useIsDarkMode;
