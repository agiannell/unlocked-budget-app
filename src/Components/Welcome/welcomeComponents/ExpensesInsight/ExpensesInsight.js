import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif';
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
                setIncomeSum(res.data[0].sum);
                axios.get(`/api/expense-sum/${ user_id }`)
                    .then(results => {
                        setExpenseSum(results.data[0].sum);
                    })
                })
                .catch(err => console.log(err));
                
                setLeftToBudget(incomeSum - expenseSum);
                setLoading(false);
        // axios.get(`/api/expense-sum/${ user_id }`)
        //     .then(res => {
        //         setExpenseSum(res.data[0].sum);
        //         setLeftToBudget(incomeSum - expenseSum);
        //         setLoading(false);
        //     })
        //     .catch(err => console.log(err));
    }, [user_id, groupName, incomeSum, expenseSum])

    return (
        <section>
            { !loading
                ? (
                    <>
                        <h1>${ leftToBudget }</h1>
                        <h4>left to budget</h4>
                        <p>Great job, { first_name }! You've got the basics covered.</p>
                        <Link to='/welcome/giving-intro'><button>Continue</button></Link>
                    </>
                )
                : (
                    <section className='welcome-loading'>
                        <img src={ loadingSpinner } alt='loading' />
                    </section>
                ) 
            }
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(ExpensesInsight);