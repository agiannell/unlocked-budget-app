import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FinalInsight.css'

const FinalInsight = props => {
    const [ expenseSum, setExpenseSum ] = useState(0),
          [ incomeSum, setIncomeSum ] = useState(0),
          [ leftToBudget, setLeftToBudget ] = useState(0),
          [ groupInfo, setGroupInfo ] = useState({});
          
    useEffect(() => {
        const { user_id } = props.user,
              groupName = 'income';
        
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
        
    }, [props.user, incomeSum, expenseSum])
            
    const handleSubmit = () => {
        const { user_id } = props.user,
                groupsArr = ['health', 'savings'],
                catArr = [
                    { name: 'medicine', amount: 0, category: 'health' },
                    { name: 'doctor visits', amount: 0, category: 'health' },
                    { name: 'emergency fund', amount: 0, category: 'savings' },
                    { name: 'retirement', amount: 0, category: 'savings' }
                ];
        let group_id
            
        groupsArr.map(e => (
            axios.post('/api/group', { user_id, groupName: e })
            .then(res => {
                // console.log(res.data[0])
                group_id = res.data[0].group_id
                console.log(group_id)
                catArr.map(el => {
                    if(el.group === e) {
                        return (
                            axios.post('/api/category', { group_id, categoryName: el.name, categoryAmount: el.amount  })
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