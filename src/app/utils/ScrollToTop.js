"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = ({ children }) => {
  const path = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [path]);

  return children || null;
};

export default ScrollToTop;
