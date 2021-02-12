import axios from 'axios';
import { useState } from 'react';
import './EditTransaction.css';

const EditTransaction = props => {
    const { transId, type, name, amount, date, notes, categories, toggleFn, getTransFn  } = props,
          [ transName, setTransName ] = useState(name),
          [ transDate, setTransDate ] = useState(date),
          [ transType, setTransType ] = useState(type),
          [ transAmount, setTransAmount ] = useState(amount),
          [ catId, setCatId ] = useState(''),
          [ transNotes, setTransNotes ] = useState(notes);

    const updateTransaction  = e => {
        e.preventDefault()

        axios.put(`/api/transaction/${ transId }`, {
            name: transName, 
            date: transDate,
            amount: transAmount,
            notes: transNotes,
            type: transType
        })
        .then(() => {
            getTransFn()
            toggleFn()
        })
        .catch(err => console.log(err))
    }

    const deleteTransaction = e => {
        e.preventDefault()

        axios.delete(`/api/transaction/${ transId }`)
            .then(() => {
                getTransFn()
                toggleFn()
            })
            .catch(err => console.log(err));
    }

    // console.log(`User ID: ${user_id}`)
    // console.log(`Cat ID: ${catId}`)
    // console.log(`Type: ${type}`)
    // console.log(`Amount: ${amount}`)
    // console.log(`Date: ${date}`)
    // console.log(`Description: ${name}`)
    // console.log(`Notes: ${notes}`)
    return (
        <section className='edit-transaction'>
            <form className='new-trans-info'>
                <header>
                    <h2>Edit { transType === 'expense' ? 'Expense' : 'Income' }</h2>
                    <h3 onClick={ toggleFn }>X</h3>
                </header>
                <section className='set-type' onChange={ e => setTransType(e.target.value) }>
                    <input 
                        value='expense'
                        type='radio' 
                        id='expense' 
                        name='type' 
                        defaultChecked />
                    <label htmlFor='expense'>Expense</label>
                    <input 
                        value='income'
                        type='radio' 
                        id='income' 
                        name='type' />
                    <label htmlFor='income'>Income</label>
                </section>
                <section className='trans-inputs'>
                    <input 
                        value={ transAmount }
                        type='text' 
                        id='amount' 
                        placeholder='$0.00'
                        onChange={ e => setTransAmount(e.target.value) } />
                    <div>
                        <input 
                            value={ transDate }
                            type='date' 
                            id='date'
                            onChange={ e => setTransDate(e.target.value) } />
                        <input 
                            value={ transName }
                            type='text' 
                            id='desc' 
                            placeholder='Description'
                            onChange={ e => setTransName(e.target.value) } />
                    </div>
                    <select value={ catId } id='category' placeholder='Category' onChange={ e => setCatId(e.target.value) }>
                        <option value='' defaultValue disabled hidden>Choose One</option>
                        { categories.map(e => (
                            <option kay={ e.cat_id } value={ e.cat_id }>{ e.name }</option>
                        )) }
                    </select>
                    <textarea 
                        value={ transNotes }
                        type='text' 
                        id='notes' 
                        placeholder='Notes (optional)'
                        onChange={ e => setTransNotes(e.target.value) } />
                </section>
                <button onClick ={ e => updateTransaction(e) }>Save Changes</button>
                <h3 className='remove-trans' onClick={ e => deleteTransaction(e) }>Delete Transaction</h3>
            </form>
        </section>
    )
}

export default EditTransaction;