import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './ExpensesInsight.css'

const ExpensesInsight = props => {
    const [ expenseSum, setExpenseSum ] = useState(0),
          [ incomeSum, setIncomeSum ] = useState(0),
          [ leftToBudget, setLeftToBudget ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id, first_name } = props.user,
          groupName = 'income';

    useEffect(() => {
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                // console.log(res.data)
                setIncomeSum(res.data.sum);
                axios.get(`/api/expense-sum/${ user_id }`)
                    .then(results => {
                        // console.log(results.data)
                        setExpenseSum(results.data.sum);
                    })
                })
                .catch(err => console.log(err));
                
            setLeftToBudget(incomeSum - expenseSum);
            setTimeout(() => {
                setLoading(false)
            }, 1000)
    }, [user_id, groupName, incomeSum, expenseSum])

    return (
        <section>
            { !loading
                ? (
                    <section className='intro'>
                        <section className='intro-content'>
                            <div>
                                <h1>${ leftToBudget }</h1>
                                <p>left to budget</p>
                            </div>
                            <p>Great job, <span className='first-name'>{ first_name }!</span> You've got the basics covered.</p>
                            <Link to='/welcome/giving-intro'><button className='continue'>Continue</button></Link>
                            <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
                        </section>
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

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(ExpensesInsight);