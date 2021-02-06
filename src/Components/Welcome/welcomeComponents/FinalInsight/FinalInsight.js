import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FinalInsight.css'

const FinalInsight = props => {
    const [ expenseSum, setExpenseSum ] = useState(0),
          [ incomeSum, setIncomeSum ] = useState(0),
          [ leftToBudget, setLeftToBudget ] = useState(0),
          [ medicine, setMedicine ] = useState({ name: 'medicine', amount: 0.00, group: 'health' }),
          [ doctorVisits, setDoctorVisits ] = useState({ name: 'doctor visits', amount: 0.00, group: 'health' }),
          [ emergencyFund, setEmergencyFund ] = useState({ name: 'emergency fund', amount: 0.00, group: 'savings' }),
          [ retirement, setRetirement ] = useState({ name: 'retirement', amount: 0.00, group: 'savings' }),
          [ groupInfo, setGroupInfo ] = useState({}),
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

    const handleSubmit = () => {
        const groupsArr = ['health', 'savings'],
              catArr = [medicine, doctorVisits, emergencyFund, retirement],
              { user_id } = props.user;
            
        groupsArr.map(e => (
            axios.post('/api/group', { user_id, groupName: e })
            .then(res => {
                setGroupInfo(res.data[0])
                catArr.map(el => {
                    if(el.group === e) {
                        return (
                            axios.post('/api/category', { group_id: groupInfo.group_id, categoryName: el.name, categoryAmount: el.amount  })
                                .then()
                                .catch(err => console.log(err))
                        )
                    } else {
                        return console.log('no!')
                    }
                })
            })
            .catch(err => console.log(err))
        ))
        props.history.push('/dash')
    }

    const { first_name } = props.user
    return (
        <section>
            <h1>${ leftToBudget }</h1>
            <h4>left to budget</h4>
            <p>Great job, { first_name }! Now give every remaining dollar a purpose. Make a new budget line, pay off more debt, or build some savings</p>
            <button onClick={ handleSubmit }>Continue</button>
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(FinalInsight);