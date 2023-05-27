import { ReactNode } from "react";
import Navbar from "./Navbar";

type PropType = {
  children: ReactNode;
};

const Layout = ({ children }: PropType) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
