import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif'
import './IncomeEntry.css';

const IncomeEntry = props => {
    const [ paycheck1, setPaycheck1 ] = useState({ name: 'paycheck 1', amount: '0.00' }),
          [ paycheck2, setPaycheck2 ] = useState({ name: 'paycheck 2', amount: '0.00' }),
          [ paycheck3, setPaycheck3 ] = useState({ name: 'paycheck 3', amount: '0.00' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
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
        // paychecksArr = [paycheck1, paycheck2, paycheck3];

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
        
        // paychecksArr.map(e => {
        //     console.log(e.amount)
        //     axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => console.log(err))
        // })
        // props.history.push('/welcome/income-insight');
    }

    // console.log(props);
    return (
        <section className='income-entry'>
            { !loading
                ? (
                    <>
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
                                    onChange={ e => setPaycheck1((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                            <div className='paycheck-line'>
                                <input 
                                    value={ paycheck2.name }
                                    onChange={ e => setPaycheck2((s) => ({ ...s, name: e.target.value })) } />
                                <input 
                                    value={ paycheck2.amount }
                                    onChange={ e => setPaycheck2((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                            <div className='paycheck-line'>
                                <input 
                                    value={ paycheck3.name }
                                    onChange={ e => setPaycheck3((s) => ({ ...s, name: e.target.value })) } />
                                <input 
                                    value={ paycheck3.amount }
                                    onChange={ e => setPaycheck3((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </form>
                        <button onClick={ e => handleSubmit(e) }>Continue</button>
                        <span onClick={ props.history.goBack }>&#60; Back</span>
                    </>
                )
                : (
                    <section className='loading'>
                        <img src={ loadingSpinner } alt='loading' />
                    </section>
                ) 
            }

        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user });

export default connect(mapStateToProps)(IncomeEntry);