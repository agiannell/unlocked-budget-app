import axios from 'axios';
import { useState } from 'react';
import './EditTransaction.css';

const EditTransaction = props => {
    const { transId, type, name, amount, date, notes, categories, toggleFn  } = props,
          [ transName, setTransName ] = useState(name),
          [ transDate, setTransDate ] = useState(date),
          [ transType, setTransType ] = useState(type),
          [ transAmount, setTransAmount ] = useState(amount),
          [ catId, setCatId ] = useState(null),
          [ transNotes, setTransNotes ] = useState(notes);

    const updateTransaction  = (e) => {
        e.preventDefault()

        axios.put(`/api/transaction/${ transId }`, {
            name: transName, 
            date: transDate,
            amount: transAmount,
            notes: transNotes,
            type: transType
        })
        .then(() => {
            toggleFn()
        })
        .catch(err => console.log(err))
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
                    <label for='expense'>Expense</label>
                    <input 
                        value='income'
                        type='radio' 
                        id='income' 
                        name='type' />
                    <label for='income'>Income</label>
                </section>
                <section className='trans-inputs'>
                    <input 
                        value={ amount }
                        type='text' 
                        id='amount' 
                        placeholder='$0.00'
                        onChange={ e => setTransAmount(e.target.value) } />
                    <div>
                        <input 
                            value={ date }
                            type='date' 
                            id='date'
                            onChange={ e => setTransDate(e.target.value) } />
                        <input 
                            value={ name }
                            type='text' 
                            id='desc' 
                            placeholder='Description'
                            onChange={ e => setTransName(e.target.value) } />
                    </div>
                    <select value={ catId } id='category' placeholder='Category' onChange={ e => setCatId(e.target.value) }>
                        <option value='' selected disabled hidden>Choose One</option>
                        { categories.map(e => (
                            <option value={ e.cat_id }>{ e.name }</option>
                        )) }
                    </select>
                    <textarea 
                        value={ notes }
                        type='text' 
                        id='notes' 
                        placeholder='Notes (optional)'
                        onChange={ e => setTransNotes(e.target.value) } />
                </section>
                <button onClick ={ e => updateTransaction(e) }>Update</button>
            </form>
        </section>
    )
}

export default EditTransaction;