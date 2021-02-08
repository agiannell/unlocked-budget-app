import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesLifestyle.css'

const ExpensesLifestyle = props => {
    const [ clothing, setClothing ] = useState({ name: 'clothing', amount: 0 }),
          [ phone, setPhone ] = useState({ name: 'phone', amount: 0 }),
          [ funMoney, setFunMoney ] = useState({ name: 'fun money', amount: 0 }),
          [ subscriptions, setSubscriptions ] = useState({ name: 'subscriptions', amount: 0 }),
          [ misc, setMisc ] = useState({ name: 'miscellaneous', amount: 0 }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'lifestyle' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
              catArr = [clothing, phone, funMoney, subscriptions, misc];

        catArr.map(e => (
            axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
                .then()
                .catch(err => console.log(err))
        ))

        props.history.push('/welcome/expenses-insight');
    }

    return (
        <section>
            <h1>Enter your lifestyle expenses</h1>
            <h2>These can be edited later.</h2>
            <form>
                <div className='expenses-entry-headers'>
                    <h1>Lifestyle</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ clothing.name }
                        onChange={ e => setClothing((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ clothing.amount }
                        onChange={ e => setClothing((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ phone.name }
                        onChange={ e => setPhone((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ phone.amount }
                        onChange={ e => setPhone((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ funMoney.name }
                        onChange={ e => setFunMoney((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ funMoney.amount }
                        onChange={ e => setFunMoney((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ subscriptions.name }
                        onChange={ e => setSubscriptions((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ subscriptions.amount }
                        onChange={ e => setSubscriptions((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ misc.name }
                        onChange={ e => setMisc((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ misc.amount }
                        onChange={ e => setMisc((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span onClick={ props.history.goBack }>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesLifestyle);