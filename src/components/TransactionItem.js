import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../styles/TransactionItem.css";

const TransactionItem = (props) => {
  return (
    <div className="trans-table__container">
      <Paper elevation={6}>
        <TableContainer>
          <Table sx={{ minWidth: 750}} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Contact name</TableCell>
                <TableCell align="right">Business name</TableCell>
                <TableCell align="right">Transaction type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell align="right">{transaction.date}</TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
                  <TableCell align="right">{transaction.status}</TableCell>
                  <TableCell align="right">{transaction.user}</TableCell>
                  <TableCell align="right">
                    {transaction.contact_name}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.business_name}
                  </TableCell>
                  <TableCell align="right">{transaction.trans_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TransactionItem;
