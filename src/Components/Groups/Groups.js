import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../Categories/Categories';
import './Groups.css'

const Groups = props => {
    const [ categories, setCategories ] = useState([]),
          { id, name, user_id } = props;

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

    const addCategory = () => {
        axios.post('/api/category', { group_id: id, user_id, categoryName: '', categoryAmount: 0.00 })
            .then(res => {
                setCategories(res.data);
                console.log(categories)
            })
            .catch(err => console.log(err))
    }

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
                    catId={ e.cat_id }
                    groupName={ name } />
            )) }
            <section className='add-category' onClick={ addCategory }>
                <div className='add-btn'>+</div>
                Add New
            </section>
        </section>
    )
}

export default Groups;