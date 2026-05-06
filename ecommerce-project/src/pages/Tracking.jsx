import React from "react";
import './Tracking.css';
import { Header } from "../components/Header";

export const Tracking = ({cart}) => {
  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page"></div>
    </>
  );
};
