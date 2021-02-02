import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../Categories/Categories';

const Groups = props => {
    const [ categories, setCategories ] = useState([]);

    const getCategories = () => {
        axios.get(`/api/categories/${ props.id }`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <section>
            <h1>{ props.name }</h1>
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