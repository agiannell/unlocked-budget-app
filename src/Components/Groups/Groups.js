import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../Categories/Categories';
import './Groups.css'

const Groups = props => {
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const getCategories = () => {
            axios.get(`/api/categories/${ props.id }`)
                .then(res => {
                    setCategories(res.data)
                })
                .catch(err => console.log(err))
        }

        getCategories()
    }, [props.id])

    return (
        <section className='groups'>
            <div className='group-titles'>
                <h1>{ props.name }</h1>
                <div className='group-money'>
                    <h2>Planned</h2>
                    <h2>Received</h2>
                </div>
            </div>
            { categories.map(e => (
                <Categories 
                    key={ e.cat_id }
                    name={ e.name }
                    amount={ e.amount } />
            )) }
        </section>
    )
}

export default Groups;