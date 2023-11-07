"use client";

import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga";

const InitGA = () => {
  const pathname = usePathname();
  const SearchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize("G-7LB14FK7SE");
    ReactGA.pageview(pathname + SearchParams);
  }, [pathname, SearchParams]);
};

export default InitGA;
