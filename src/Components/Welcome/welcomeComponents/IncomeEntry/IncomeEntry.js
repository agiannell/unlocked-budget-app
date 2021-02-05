import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './IncomeEntry.css';

const IncomeEntry = props => {
    const [ paycheck1, setPaycheck1 ] = useState({ name: 'Paycheck 1', amount: 0.00 }),
          [ paycheck2, setPaycheck2 ] = useState({ name: 'Paycheck 2', amount: 0.00 }),
          [ paycheck3, setPaycheck3 ] = useState({ name: 'Paycheck 3', amount: 0.00 }),
          [ groupInfo, setGroupInfo ] = useState({});

    useEffect(() => {
        const { user_id } = props.user

        axios.post('/api/group', { user_id, groupName: 'income' })
            .then(res => {
                setGroupInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
              paychecksArr = [paycheck1, paycheck2, paycheck3];
        let sum

        paychecksArr.map((e, i) => {
            axios.post('/api/category', { group_id, categoryName: e.name, categoryAmount: e.amount })
                .then(() => { 
                    sum += e.amount
                 })
                .catch(err => console.log(err))
        })

        props.history.push('/welcome/income-insight');
    }

    console.log(paycheck1, props)
    return (
        <section className='income-entry'>
            <h1>Enter your paychecks</h1>
            <h2>If your paychecks fluctuate, enter the lowest amount you expect.</h2>
            <form>
                <div className='income-entry-headers'>
                    <h1>Income</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='paycheck-line'>
                    <input 
                        value={ paycheck1.name }
                        onChange={ e => setPaycheck1((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ paycheck1.amount }
                        onChange={ e => setPaycheck1((s) => ({ ...s, amount: +e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='paycheck-line'>
                    <input 
                        value={ paycheck2.name }
                        onChange={ e => setPaycheck1((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ paycheck2.amount }
                        onChange={ e => setPaycheck2((s) => ({ ...s, amount: +e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='paycheck-line'>
                    <input 
                        value={ paycheck3.name }
                        onChange={ e => setPaycheck1((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ paycheck3.amount }
                        onChange={ e => setPaycheck3((s) => ({ ...s, amount: +e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(IncomeEntry);