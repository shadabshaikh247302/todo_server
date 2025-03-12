import { Inter } from "next/font/google";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { MonthlyProvider } from "./Context/MonthlyContext";
import { Provider } from "./Context/DailyContext";
import { Authprovider } from "./Context/Authcontext";
import { Navbar } from "./component/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Toaster> */}
          <Toaster/>
          <Provider>
            <MonthlyProvider>
                <Authprovider>
                <Navbar/>
                {children}
                </Authprovider>
            </MonthlyProvider>
          </Provider>    
      </body>
    </html>
  );
}
