"use client";
import { store } from "@/redux/store";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
interface Iprops {
  children: ReactNode;
}
const LayoutClient: FC<Iprops> = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default LayoutClient;
