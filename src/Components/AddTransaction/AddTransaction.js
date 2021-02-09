import { useState } from 'react';

const AddTransaction = props => {
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay();

    return (
        <section className='add-transaction'>
            <form className='new-trans-info'>
                <header>
                    <h2>Add New Expense</h2>
                </header>
                <section>
                    <input type='radio' />
                    <input type='radio' />
                </section>
                <section className='trans-inputs'>
                    <input type='number' placeholder='$0.00' />
                    <input type='date' placeholder={ `${month}/${day}/${year}` } />
                    <input type='text' placeholder='Description' />
                    <input type='range' placeholder='Category' />
                    <input type='text' placeholder='Notes(optional)' />
                </section>
            </form>
        </section>
    )
}

export default AddTransaction;