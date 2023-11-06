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
  title: "Get The Right Job You Deserve at BanksterIndia",
  description:
    "Banksterindia.com a part of RALT INFOTECH PVT LTD, which is earlier known as &quot;RALT HR SERVICES&quot; is promoted by Mr. Trivesh Kumar, he is having 12+ Years of the vintage in the Service Industry. RALT INFOTECH comprises different entities that are into providing multiple services and facilities to our client Corporates and Individuals, providing a platform that takes care of your non-core functions and gives you the time and opportunity to focus on your core business activities.",
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
  }

  // ReactGA.initialize("G-7LB14FK7SE");

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          // integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          // crossorigin="anonymous"
        />

        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          // crossorigin="anonymous"
        ></Script>
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          // crossorigin="anonymous"
        ></Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <Script src="semantic/dist/semantic.min.js"></Script>
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
