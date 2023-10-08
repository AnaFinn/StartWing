import React from 'react'
import TransactionItem from './components/TransactionItem'

const TransactionList = (props) => {
if (props.items.length===0){
    return(
        <div>
            <h2>No transactions to show</h2>
        </div>
    )
}
  return (
    <ul>
        {props.items.map((transaction) =>{
            return(
                <TransactionItem
                key={transaction.id}
                id = {transaction.id}
                date = {transaction.date}
                amount = {transaction.amount}
                status = {transaction.status}
                user = {transaction.user}
                contact_name = {transaction.contact_name}
                business_name = {transaction.business_name}
                trans_type = {transaction.trans_type}
                />
            )
        })}
    </ul>
  )
}

export default TransactionList
