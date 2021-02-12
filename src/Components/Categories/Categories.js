import { useState, useEffect } from 'react';
import axios from 'axios';
import trash from '../../img/trash-can.svg';
import './Categories.css';

const Categories = props => {
    const { name, amount, catId, groupName, getCategoriesFn, getGroupSums } = props,
          [ catName, setCatName ] = useState(name),
          [ catAmount, setCatAmount ] = useState(amount),
          [ remaining, setRemaining ] = useState(amount),
          [ received, setReceived ] = useState(0),
          [ isFocused, setIsFocused ] = useState(false),
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
            .then(() => {
                getGroupSums();
                setIsFocused(false);
            })
            .catch(err => console.log(err));
        }
        
        const deleteCategory = (e) => {
            e.preventDefault()
            
            axios.delete(`/api/category/${ catId }`)
            .then(() => {
                setIsFocused(false);
                getCategoriesFn();
            })
            .catch(err => console.log(err))
    }

    return (
        <section>
            <section className={ !isFocused ? 'categories' : 'categories focused' }>
                <img
                    src={ trash } 
                    alt='trash'
                    onMouseDown={ e => deleteCategory(e) }
                    className={ !isFocused ? 'delete-category hidden' : 'delete-category' } />
                <form 
                    className='cat-form'
                    onSubmit={ e => updateCategory(e) }>
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
            </section>
        </section>
    )
}

export default Categories