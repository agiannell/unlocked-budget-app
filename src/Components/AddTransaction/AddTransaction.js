import axios from 'axios';
import { useState } from 'react';
import './AddTransaction.css';

const AddTransaction = props => {
    const [ name, setName ] = useState(''),
          [ date, setDate ] = useState(''),
          [ type, setType ] = useState('expense'),
          [ amount, setAmount ] = useState(''),
          [ category, setCategory ] = useState(''),
          [ notes, setNotes ] = useState(''),
          [ catId, setCatId ] = useState(''),
          { user_id } = props;

    const createTransaction = () => {
        axios.post('/api/transaction', { user_id, catId, type, name, date, amount, notes })
        .then(() => {
            props.toggleFn()
        })
        .catch(err => console.log(err))
    }

    console.log(props)
    return (
        <section className='add-transaction'>
            <form className='new-trans-info'>
                <header>
                    <h2>Add New Expense</h2>
                </header>
                <section className='set-type' onChange={ e => setType(e.target.value) }>
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
                    <input 
                        value={ category }
                        id='category' 
                        placeholder='Category'
                        onChange={ e => setCategory(e.target.value) } />
                    <textarea 
                        value={ notes }
                        type='text' 
                        id='notes' 
                        placeholder='Notes(optional)'
                        onChange={ e => setNotes(e.target.value) } />
                </section>
                <button>Add Expense</button>
            </form>
        </section>
    )
}

export default AddTransaction;