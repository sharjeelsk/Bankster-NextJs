"use client";

import React from "react";
import "../style/Pages.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function RefundPolicy() {
  return (
    <div>
      <Header />
      <div className="page-section">
        <h1>Refund Policy</h1>
        <p>
          Refund policy is a statement explaining the rules for getting refunds
          for any purchased goods or services.
        </p>
        <p>
          BanksterIndia has a <b>“NO REFUND POLICY”</b> which means that our
          recruitment agency will not provide any compensation for any service
          taken from us.
        </p>
        <p>
          No refund policies for subscriptions which means users will not get
          refunds for payments already made.{" "}
        </p>
        <h2>“NO REFUND POLICY”</h2>
      </div>
      <Footer />
    </div>
  );
}

export default RefundPolicy;
