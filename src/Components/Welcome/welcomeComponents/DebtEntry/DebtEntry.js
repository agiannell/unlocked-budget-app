import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './DebtEntry.css'

const DebtEntry = props => {
    const [ creditCard, setCreditCard ] = useState({ name: 'credit card', amount: '' }),
          [ carPayment, setCarPayment ] = useState({ name: 'car payment', amount: '' }),
          [ studentLoan, setStudentLoan ] = useState({ name: 'student loan', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'debt' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = e => {
        e.preventDefault()
        const { group_id } = groupInfo;
        setLoading(true);

        axios.post('/api/category', { group_id, user_id, categoryName: creditCard.name, categoryAmount: +creditCard.amount })
            .then(() => {
                axios.post('/api/category', { group_id, user_id, categoryName: carPayment.name, categoryAmount: +carPayment.amount })
                    .then(() => {
                        axios.post('/api/category', { group_id, user_id, categoryName: studentLoan.name, categoryAmount: +studentLoan.amount })
                            .then(() => {
                                props.history.push('/welcome/debt-insight')
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
                        <h1>Enter your <br />monthly debt payments</h1>
                        <p>These can be edited later.</p>
                        <form>
                            <section className='entry-form'>
                                <div className='entry-headers'>
                                    <h1>Debt</h1>
                                    <div className='entry-money'>
                                        <p>Planned</p>
                                        <p>Received</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Credit Card'
                                        value={ creditCard.name }
                                        onChange={ e => setCreditCard((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ creditCard.amount }
                                            onChange={ e => setCreditCard((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Car Payment'
                                        value={ carPayment.name }
                                        onChange={ e => setCarPayment((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ carPayment.amount }
                                            onChange={ e => setCarPayment((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        placeholder='Student Loan'
                                        value={ studentLoan.name }
                                        onChange={ e => setStudentLoan((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ studentLoan.amount }
                                            onChange={ e => setStudentLoan((s) => ({ ...s, amount: e.target.value })) } />
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

export default connect(mapStateToProps)(DebtEntry);