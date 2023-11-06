"use client";

import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga";

const initGA = () => {
  ReactGA.initialize("G-7LB14FK7SE");
  //   const pathname = usePathname();
  //   const SearchParams = useSearchParams();

  //   useEffect(() => {
  //     ReactGA.pageview(pathname + SearchParams);
  //   }, [pathname, SearchParams]);
};

export default initGA;
