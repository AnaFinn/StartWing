import React from "react";
import TransactionList from "../TransactionList";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
    function createData(
        id,
        date,
        amount,
        status,
        user,
        contact_name,
        business_name,
        trans_type,
      ) {
        return { id, date, amount, status, user, contact_name, business_name,trans_type };
      }
  const TRANS = [
    createData("ui1", "15 Jun 2022", "102,000.00", "Successful", "ana Karp", "John Doe", "green Corp", "Visa"),
    createData("ui2", "15 Jun 2022", "102,000.00", "Successful", "ana Karp", "John Doe", "green Corp", "Visa"),
    createData("ui3", "15 Jun 2022", "102,000.00", "Successful", "ana Karp", "John Doe", "green Corp", "Visa"),
    createData("ui4", "15 Jun 2022", "102,000.00", "Successful", "ana Karp", "John Doe", "green Corp", "Visa"),
  ];
  return <TransactionItem items={TRANS}/>;
};

export default Transactions;
