import "./style/globals.scss";
import { Montserrat, Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";

import Snackbar from "./utils/Snackbar";
import SimpleBackdrop from "./utils/SimpleBackdrop";
import ScrollToTop from "./utils/ScrollToTop";
import Script from "next/script";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Providers } from "@/redux/provider";
import customTheme from "./utils/CustomTheme";
import InitGA from "./utils/Analytics";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: {
    default: "BanksterIndia",
    template: `%s | BanksterIndia`,
  },
  description:
    "Banksterindia.com a part of RALT INFOTECH PVT LTD, which is earlier known as &quot;RALT HR SERVICES&quot; is promoted by Mr. Trivesh Kumar, he is having 12+ Years of the vintage in the Service Industry. RALT INFOTECH comprises different entities that are into providing multiple services and facilities to our client Corporates and Individuals, providing a platform that takes care of your non-core functions and gives you the time and opportunity to focus on your core business activities.",
   openGraph: {
      images: "/opengraph-image.png",
    },
};

const firebaseConfig = {
  apiKey: "AIzaSyD50snRWD7_--t2NiN-mJ4zZEY3eBxW74I",
  authDomain: "banksterindia-43665.firebaseapp.com",
  projectId: "banksterindia-43665",
  storageBucket: "banksterindia-43665.appspot.com",
  messagingSenderId: "110029599340",
  appId: "1:110029599340:web:e0fa93b2f9e613f585de49",
  measurementId: "G-7LB14FK7SE",
};

export default function RootLayout({ children }) {
  if (typeof window !== "undefined") {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    InitGA();
  }

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />

        <Script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        ></Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          crossOrigin="anonymous"
        ></Script>
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossOrigin="anonymous"
        ></Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <Script
          src="https://kit.fontawesome.com/9e69520da3.js"
          crossOrigin="anonymous"
        ></Script>
        <Script src="semantic/dist/semantic.min.js"></Script>
        <Script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></Script>
      </head>
      <body>
        <Providers>
          <ThemeProvider theme={customTheme}>
            <Snackbar />
            <SimpleBackdrop />
            {/* <initGA> */}
            <ScrollToTop>{children}</ScrollToTop>
            {/* </initGA> */}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
