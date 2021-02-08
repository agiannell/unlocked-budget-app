import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './DebtEntry.css'

const DebtEntry = props => {
    const [ creditCard, setCreditCard ] = useState({ name: 'credit card', amount: 0.00 }),
          [ carPayment, setCarPayment ] = useState({ name: 'car payment', amount: 0.00 }),
          [ studentLoan, setStudentLoan ] = useState({ name: 'student loan', amount: 0.00 }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'debt' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
                catArr = [creditCard, carPayment, studentLoan];

        catArr.map(e => (
            axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
                .then()
                .catch(err => console.log(err))
        ))

        props.history.push('/welcome/debt-insight');
    }
    return (
        <section className=''>
            <h1>Enter your monthly debt payments</h1>
            <h2>These can be edited later.</h2>
            <form>
                <div className='expenses-entry-headers'>
                    <h1>Debt</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ creditCard.name }
                        onChange={ e => setCreditCard((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ creditCard.amount }
                        onChange={ e => setCreditCard((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ carPayment.name }
                        onChange={ e => setCarPayment((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ carPayment.amount }
                        onChange={ e => setCarPayment((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ studentLoan.name }
                        onChange={ e => setStudentLoan((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ studentLoan.amount }
                        onChange={ e => setStudentLoan((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span onClick={ props.history.goBack }>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(DebtEntry);