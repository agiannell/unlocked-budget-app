import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './ExpensesLifestyle.css'

const ExpensesLifestyle = props => {
    const [ clothing, setClothing ] = useState({ name: 'clothing', amount: '' }),
          [ phone, setPhone ] = useState({ name: 'phone', amount: '' }),
          [ funMoney, setFunMoney ] = useState({ name: 'fun money', amount: '' }),
          [ subscriptions, setSubscriptions ] = useState({ name: 'subscriptions', amount: '' }),
          [ misc, setMisc ] = useState({ name: 'miscellaneous', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
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
        const { group_id } = groupInfo;
        setLoading(true);

        axios.post('/api/category', { group_id, user_id, categoryName: clothing.name, categoryAmount: +clothing.amount })
            .then(() =>{
                axios.post('/api/category', { group_id, user_id, categoryName: phone.name, categoryAmount: +phone.amount })
                    .then(() => {
                        axios.post('/api/category', { group_id, user_id, categoryName: funMoney.name, categoryAmount: +funMoney.amount })
                            .then(() => {
                                axios.post('/api/category', { group_id, user_id, categoryName: subscriptions.name, categoryAmount: +subscriptions.amount })
                                    .then(() => {
                                        axios.post('/api/category', { group_id, user_id, categoryName: misc.name, categoryAmount: +misc.amount })
                                            .then(() => {
                                                props.history.push('/welcome/expenses-insight')
                                            })
                                    })
                            })
                    })
            })
            .catch(err => console.log(err));
    }

    return (
        <section className='intro'>
            { !loading
                ? (
                    <section className='entry'>
                        <h1>Enter your<br /> lifestyle expenses</h1>
                        <p>These can be edited later.</p>
                        <form>
                            <section className='entry-form'>
                                <div className='entry-headers'>
                                    <h1>Lifestyle</h1>
                                    <div className='entry-money'>
                                        <p>Planned</p>
                                        <p>Received</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Clothing'
                                        value={ clothing.name }
                                        onChange={ e => setClothing((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ clothing.amount }
                                            onChange={ e => setClothing((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Phone'
                                        value={ phone.name }
                                        onChange={ e => setPhone((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ phone.amount }
                                            onChange={ e => setPhone((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Fun Money'
                                        value={ funMoney.name }
                                        onChange={ e => setFunMoney((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ funMoney.amount }
                                            onChange={ e => setFunMoney((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Subscriptions'
                                        value={ subscriptions.name }
                                        onChange={ e => setSubscriptions((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ subscriptions.amount }
                                            onChange={ e => setSubscriptions((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Miscellaneous'
                                        value={ misc.name }
                                        onChange={ e => setMisc((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ misc.amount }
                                            onChange={ e => setMisc((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                            </section>
                            <button className='continue' onClick={ e => handleSubmit(e) }>Continue</button>
                        </form>
                        <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
                    </section>
                ) 
                : (
                    <section className='loading'>
                        <SyncLoader
                            color='#fff'
                            size='30px' />
                    </section>
                )
            }
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesLifestyle);