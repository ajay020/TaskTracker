import { ReactNode } from "react";

type PropType = {
  children: ReactNode;
};

const Layout = ({ children }: PropType) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
