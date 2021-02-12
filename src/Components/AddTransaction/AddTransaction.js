import axios from 'axios';
import { useState } from 'react';
import './AddTransaction.css';

const AddTransaction = props => {
    const [ name, setName ] = useState(''),
          [ date, setDate ] = useState(''),
          [ type, setType ] = useState('expense'),
          [ amount, setAmount ] = useState(''),
          [ notes, setNotes ] = useState(''),
          [ catId, setCatId ] = useState(null),
          { user_id, categories, toggleFn, getUntrackedTrans, getTrackedTrans } = props;

    const createTransaction = (e) => {
        e.preventDefault()

        axios.post('/api/transaction', { user_id, catId, type, name, date, amount, notes })
        .then(() => {
            toggleFn()
            getUntrackedTrans()
            getTrackedTrans()
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
        <section className='add-transaction'>
            <form className='new-trans-info'>
                <header>
                    <h2>Add New { type === 'expense' ? 'Expense' : 'Income' }</h2>
                    <h3 onClick={ toggleFn }>X</h3>
                </header>
                <section className='set-type' onChange={ e => setType(e.target.value) }>
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
                        value={ amount }
                        type='text' 
                        id='amount' 
                        placeholder='$0.00'
                        onChange={ e => setAmount(e.target.value) } />
                    <div>
                        <input 
                            value={ date }
                            type='date' 
                            id='date'
                            onChange={ e => setDate(e.target.value) } />
                        <input 
                            value={ name }
                            type='text' 
                            id='desc' 
                            placeholder='Description'
                            onChange={ e => setName(e.target.value) } />
                    </div>
                    <select value={ catId } id='category' placeholder='Category' onChange={ e => setCatId(e.target.value) }>
                        <option value='' selected disabled hidden>Choose One</option>
                        { categories.map(e => (
                            <option key={ e.cat_id } value={ e.cat_id }>{ e.name }</option>
                        )) }
                    </select>
                    <textarea 
                        value={ notes }
                        type='text' 
                        id='notes' 
                        placeholder='Notes (optional)'
                        onChange={ e => setNotes(e.target.value) } />
                </section>
                <button onClick ={ e => createTransaction(e) }>Add</button>
            </form>
        </section>
    )
}

export default AddTransaction;