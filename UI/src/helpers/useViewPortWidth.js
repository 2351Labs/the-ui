// detect if viewport is within given width, returns boolean
import { useState, useEffect } from "react";

const useViewportWidth = (breakpoint) => {
  const [isPastBreakpoint, setIsPastBreakpoint] = useState(window.innerWidth > breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsPastBreakpoint(window.innerWidth > breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return [isPastBreakpoint];
};

export default useViewportWidth;
