import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesTransportation.css'

const ExpensesTransportation = props => {
    const [ gas, setGas ] = useState({ name: 'gas', amount: 0 }),
          [ maintenance, setMaintenance ] = useState({ name: 'maintenance', amount: 0 }),
          [ registration, setRegistration ] = useState({ name: 'registration & title', amount: 0 }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'transportation' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
              catArr = [gas, maintenance, registration];

        catArr.map(e => (
            axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
                .then()
                .catch(err => console.log(err))
        ))

        props.history.push('/welcome/expenses-food');
    }

    return (
        <section>
            <h1>Enter your transportation expenses</h1>
            <h2>These can be edited later.</h2>
            <form>
                <div className='expenses-entry-headers'>
                    <h1>Transportation</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ gas.name }
                        onChange={ e => setGas((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ gas.amount }
                        onChange={ e => setGas((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ maintenance.name }
                        onChange={ e => setMaintenance((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ maintenance.amount }
                        onChange={ e => setMaintenance((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ registration.name }
                        onChange={ e => setRegistration((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ registration.amount }
                        onChange={ e => setRegistration((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span onClick={ props.history.goBack }>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesTransportation);