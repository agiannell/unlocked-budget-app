import { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = props => {
    const { name, amount, catId } = props,
          [ catName, setCatName ] = useState(name),
          [ catAmount, setCatAmount ] = useState(amount),
          [ remaining, setRemaining ] = useState(amount),
          [ spent, setSpent ] = useState(0);

    useEffect(() => {
        axios.get(`api/transaction-sum/${ catId }`)
            .then(res => {
                setSpent(res.data.sum)
                setRemaining(amount - spent)
            })
            .catch(err => console.log(err))

    }, [amount, catId, spent])

    return (
        <section className='categories'>
            <input
                value={ catName }
                onChange={ e => setCatName(e.target.value) } />
            {/* <h1>{ name }</h1> */}
            <div className='cat-money'>
                <input
                    value={ catAmount }
                    onChange={ e => setCatAmount(e.target.value) } />
                {/* <p>${ props.amount }</p> */}
                <p>${ remaining }</p>
            </div>
        </section>
    )
}

export default Categories