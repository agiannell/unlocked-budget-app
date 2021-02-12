import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesFood.css'

const ExpensesFood = props => {
    const [ groceries, setGroceries ] = useState({ name: 'groceries', amount: '' }),
          [ restaurants, setRestaurants ] = useState({ name: 'restaurants', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group-init', { user_id, groupName: 'food' })
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
        <section className='intro'>
            <section className='entry'>
                <h1>Enter your<br /> food expenses</h1>
                <p>These can be edited later.</p>
                <form>
                    <section className='entry-form'>
                        <div className='entry-headers'>
                            <h1>Food</h1>
                            <div className='entry-money'>
                                <p>Planned</p>
                                <p>Received</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input
                                placeholder='Groceries'
                                value={ groceries.name }
                                onChange={ e => setGroceries((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00'
                                    value={ groceries.amount }
                                    onChange={ e => setGroceries((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input
                                placeholder='Restaurants'
                                value={ restaurants.name }
                                onChange={ e => setRestaurants((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00'
                                    value={ restaurants.amount }
                                    onChange={ e => setRestaurants((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                    </section>
                    <button className='continue' onClick={ e => handleSubmit(e) }>Continue</button>
                </form>
                <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
            </section>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesFood);