import { useState, useEffect } from 'react';
import './Transactions.css';

const Transactions = props => {
    let transDate = new Date(props.date),
        transMonth = transDate.getMonth(),
        transDay = transDate.getDay();

    const { name, date, amount, type, transId } = props

    // console.log(transDate);
    // console.log(`Month: ${transMonth}`);
    // console.log(`Day: ${transDay}`);
    return (
        <section>
            { type === 'income'
                ? (
                    <section className='income'>
                        <span>JAN<br />1</span>
                        <section className='income-content'>
                            <span>{ name }</span>
                            <span>{ `+$${ amount }` }</span>
                        </section>
                    </section>
                )
                : (
                    <section className='expense'>
                        <span>JAN<br />1</span>
                        <section className='expense-content'>
                            <span>{ name }</span>
                            <span>{ `-$${ amount }` }</span>
                        </section>
                    </section>
                ) 
            }
        </section>
    )
}

export default Transactions;