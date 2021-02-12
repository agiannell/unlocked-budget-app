import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './IncomeEntry.css';

const IncomeEntry = props => {
    const [ paycheck1, setPaycheck1 ] = useState({ name: 'paycheck 1', amount: '' }),
          [ paycheck2, setPaycheck2 ] = useState({ name: 'paycheck 2', amount: '' }),
          [ paycheck3, setPaycheck3 ] = useState({ name: 'paycheck 3', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
          [ isFocused, setIsFocused ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'income' })
            .then(res => {
                setGroupInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [user_id])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo[0];
        setLoading(true);

        axios.post('/api/category', { group_id, user_id, categoryName: paycheck1.name, categoryAmount: +paycheck1.amount })
            .then(() => {
                axios.post('/api/category', { group_id, user_id, categoryName: paycheck2.name, categoryAmount: +paycheck2.amount })
                    .then(() => {
                        axios.post('/api/category', { group_id, user_id, categoryName: paycheck3.name, categoryAmount: +paycheck3.amount })
                            .then(() => {
                                props.history.push('/welcome/income-insight')
                            })
                    })
            })
            .catch(err => console.log(err))
    }

    // console.log(props);
    return (
        <section className='intro'>
            { !loading
                ? (
                    <section className='entry'>
                        <h1>Enter your paychecks</h1>
                        <p>If your paychecks fluctuate, enter the lowest amount you expect.</p>
                        <form>
                            <section className='entry-form'>
                                <div className='entry-headers'>
                                    <h1>Income</h1>
                                    <div className='entry-money'>
                                        <p>Planned</p>
                                        <p>Received</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        onFocus={ () => setIsFocused(true) }
                                        onBlur={ () => setIsFocused(false) }
                                        value={ paycheck1.name }
                                        onChange={ e => setPaycheck1((s) => ({ ...s, name: e.target.value })) }
                                        placeholder='Paycheck 1' />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ paycheck1.amount }
                                            onChange={ e => setPaycheck1((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        value={ paycheck2.name }
                                        onChange={ e => setPaycheck2((s) => ({ ...s, name: e.target.value })) }
                                        placeholder='Paycheck 2' />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ paycheck2.amount }
                                            onChange={ e => setPaycheck2((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        value={ paycheck3.name }
                                        onChange={ e => setPaycheck3((s) => ({ ...s, name: e.target.value })) }
                                        placeholder='Paycheck 3' />
                                    <div className='entry-money'>
                                        <input 
                                            placeholder='$0.00'
                                            value={ paycheck3.amount }
                                            onChange={ e => setPaycheck3((s) => ({ ...s, amount: e.target.value })) } />
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

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user });

export default connect(mapStateToProps)(IncomeEntry);