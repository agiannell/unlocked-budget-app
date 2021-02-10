import { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = props => {
    const { name, amount, catId, groupName } = props,
          [ catName, setCatName ] = useState(name),
          [ catAmount, setCatAmount ] = useState(amount),
          [ remaining, setRemaining ] = useState(amount),
          [ received, setReceived ] = useState(0),
          [ isFocused, setIsFocused ] = useState(0),
          [ spent, setSpent ] = useState(0);

    useEffect(() => {
        axios.get(`api/transaction-sum/${ catId }`)
            .then(res => {
                setSpent(res.data.sum);
                setRemaining(amount - spent);
                if(spent) {
                    setReceived(spent);
                }
            })
            .catch(err => console.log(err))

    }, [amount, catId, spent])

    const updateCategory = (e) => {
        e.preventDefault();

        axios.put(`/api/category/${ catId }`, { catName, catAmount })
            .then()
            .catch(err => console.log(err));
    }

    return (
        <form 
            className={ !isFocused ? 'categories' : 'categories focused' } 
            onSubmit={ e => updateCategory(e) }>
            <button className={ !isFocused ? 'delete-category hidden' : 'delete-category' }>Delete</button>
            <input
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                value={ catName }
                onChange={ e => setCatName(e.target.value) } />
            <div className='cat-money'>
                <input
                    onFocus={ () => setIsFocused(true) }
                    onBlur={ () => setIsFocused(false) }
                    value={ catAmount }
                    onChange={ e => setCatAmount(e.target.value) } />
                { groupName === 'income'
                    ? (
                        <p>${ received }</p>
                        )
                        : (
                            <p>${ remaining }</p>
                            )
                        }
            </div>
            <button className='hidden'></button>
        </form>
    )
}

export default Categories