import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesFood.css'

const ExpensesFood = props => {
    const [ groceries, setGroceries ] = useState({ name: 'groceries', amount: 0 }),
          [ restaurants, setRestaurants ] = useState({ name: 'restaurants', amount: 0 }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'food' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
              catArr = [groceries, restaurants];

        catArr.map(e => (
            axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
                .then()
                .catch(err => console.log(err))
        ))

        props.history.push('/welcome/expenses-lifestyle');
    }

    return (
        <section>
            <h1>Enter your food expenses</h1>
            <h2>These can be edited later.</h2>
            <form>
                <div className='expenses-entry-headers'>
                    <h1>Food</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ groceries.name }
                        onChange={ e => setGroceries((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ groceries.amount }
                        onChange={ e => setGroceries((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ restaurants.name }
                        onChange={ e => setRestaurants((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ restaurants.amount }
                        onChange={ e => setRestaurants((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span onClick={ props.history.goBack }>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesFood);