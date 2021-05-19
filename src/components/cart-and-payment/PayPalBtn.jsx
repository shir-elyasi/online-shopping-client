import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";


export default function PayPalBtn(props) {

  const { amount, onSuccess, currency } = props;

  return (
      <PayPalButton
        amount={amount}
        currency={currency}
        onSuccess={(details, data) => onSuccess(details, data)}
        options={{
          clientId: "AXmfXys_QHqkGpbVK2UCvmPJ_X3P2dkIuqaGYWiChMXyLMKfsaMcXtpPEBHLlcq_k5O1NmnjG22OXXKw"
        }}
    />
  )

}
