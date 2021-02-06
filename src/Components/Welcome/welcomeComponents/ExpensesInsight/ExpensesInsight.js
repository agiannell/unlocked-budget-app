import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesInsight.css'

const ExpensesInsight = props => {
    const [ expenseSum, setExpenseSum ] = useState(0),
          [ incomeSum, setIncomeSum ] = useState(0),
          [ leftToBudget, setLeftToBudget ] = useState(0),
          groupName = 'income';

    useEffect(() => {
        const { user_id } = props.user;

        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setIncomeSum(res.data[0].sum)
            })
            .catch(err => console.log(err));

        axios.get(`/api/expense-sum/${ user_id }`)
            .then(res => {
                setExpenseSum(res.data[0].sum)
            })
            .catch(err => console.log(err));

        setLeftToBudget(incomeSum - expenseSum);
        
    }, [props.user, groupName, incomeSum, expenseSum])

    const { first_name } = props.user
    return (
        <section>
            <h1>${ leftToBudget }</h1>
            <h4>left to budget</h4>
            <p>Great job, { first_name }! You've got the basics covered.</p>
            <Link to='/welcome/giving-intro'><button>Continue</button></Link>
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(ExpensesInsight);