import { useEffect, useState } from "react";

export default function useFullscreen() {
  const [isFullscreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    window
      .matchMedia("(display-mode: fullscreen)")
      .addEventListener("change", ({ matches }) => {
        setIsFullScreen(matches);
      });

    return () => {
      window
        .matchMedia("(display-mode: fullscreen)")
        .removeEventListener("change", ({ matches }) => {
          setIsFullScreen(matches);
        });
    };
  }, []);

  return isFullscreen;
}
