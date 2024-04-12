import { useEffect, useState } from "react";

export const UseOrigin = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If location of window is known then render it, otherwise render the empty string
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  // For hydration errors
  if (!mounted) {
    return "";
  }

  return origin;
};
