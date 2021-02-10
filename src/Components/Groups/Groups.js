import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../Categories/Categories';
import './Groups.css'

const Groups = props => {
    const [ categories, setCategories ] = useState([]),
          { id, name } = props;

    useEffect(() => {
        const getCategories = () => {
            axios.get(`/api/categories/${ id }`)
                .then(res => {
                    setCategories(res.data)
                })
                .catch(err => console.log(err))
        }

        getCategories()
    }, [id])

    return (
        <section className='groups'>
            <div className='group-titles'>
                <h1>{ name }</h1>
                <div className='group-money'>
                    <h2>Planned</h2>
                    { name === 'income'
                        ? (
                            <h2>Received</h2>
                        )
                        : (
                            <h2>Remaining</h2>
                        ) 
                    }
                </div>
            </div>
            { categories.map(e => (
                <Categories 
                    key={ e.cat_id }
                    name={ e.name }
                    amount={ e.amount }
                    catId={ e.cat_id } />
            )) }
        </section>
    )
}

export default Groups;