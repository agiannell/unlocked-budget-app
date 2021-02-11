import { useState } from 'react';
import EditTransaction from '../EditTransaction/EditTransaction';
import './Transactions.css';

const Transactions = props => {
    const { name, date, amount, type, transId, categories } = props,
          [ isEditing, setIsEditing ] = useState(false);

    const toggle = () => !isEditing

    console.log(date)
    return (
        <section>
            { !isEditing ? null
                : (
                    <section>
                        <EditTransaction
                            transId={ transId }
                            type={ type }
                            name={ name }
                            amount={ amount }
                            date={ date }
                            toggleFn={ toggle }
                            categories={ categories } />
                    </section>
                ) 
            }
            { type === 'income'
                ? (
                    <section className='income'>
                        <span>FEB<br />12</span>
                        <section className='income-content'>
                            <span>{ name }</span>
                            <span>{ `+$${ amount }` }</span>
                        </section>
                    </section>
                )
                : (
                    <section className='expense'>
                        <span>FEB<br />12</span>
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