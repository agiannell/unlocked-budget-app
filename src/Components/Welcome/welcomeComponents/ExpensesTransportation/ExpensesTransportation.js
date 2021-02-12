import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesTransportation.css'

const ExpensesTransportation = props => {
    const [ gas, setGas ] = useState({ name: 'gas', amount: '' }),
          [ maintenance, setMaintenance ] = useState({ name: 'maintenance', amount: '' }),
          [ registration, setRegistration ] = useState({ name: 'registration & title', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ isFocused, setIsFocused ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group-init', { user_id, groupName: 'transportation' })
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
        <section className='intro'>
            <section className='entry'>
                <h1>Enter your<br /> transportation expenses</h1>
                <p>These can be edited later.</p>
                <form>
                    <section className='entry-form'>
                        <div className='entry-headers'>
                            <h1 id='transpo-title'>Transportation</h1>
                            <div className='entry-money'>
                                <p>Planned</p>
                                <p>Received</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input
                                onFocus={ () => setIsFocused(true) }
                                onBlur={ () => setIsFocused(false) } 
                                placeholder='Gas'
                                value={ gas.name }
                                onChange={ e => setGas((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    onFocus={ () => setIsFocused(true) }
                                    onBlur={ () => setIsFocused(false) } 
                                    placeholder='$0.00'
                                    value={ gas.amount }
                                    onChange={ e => setGas((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input
                                onFocus={ () => setIsFocused(true) }
                                onBlur={ () => setIsFocused(false) } 
                                placeholder='Maintenance'
                                value={ maintenance.name }
                                onChange={ e => setMaintenance((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    onFocus={ () => setIsFocused(true) }
                                    onBlur={ () => setIsFocused(false) } 
                                    placeholder='$0.00'
                                    value={ maintenance.amount }
                                    onChange={ e => setMaintenance((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input
                                onFocus={ () => setIsFocused(true) }
                                onBlur={ () => setIsFocused(false) } 
                                placeholder='Registration & Title'
                                value={ registration.name }
                                onChange={ e => setRegistration((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    onFocus={ () => setIsFocused(true) }
                                    onBlur={ () => setIsFocused(false) } 
                                    placeholder='$0.00'
                                    value={ registration.amount }
                                    onChange={ e => setRegistration((s) => ({ ...s, amount: e.target.value })) } />
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

export default connect(mapStateToProps)(ExpensesTransportation);