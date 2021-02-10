import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif'
import './FinalInsight.css'

const FinalInsight = props => {
    const [ expenseSum, setExpenseSum ] = useState(0),
          [ incomeSum, setIncomeSum ] = useState(0),
          [ leftToBudget, setLeftToBudget ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id, first_name } = props.user,
          groupName = 'income';

    useEffect(() => {
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
        .then(res => {
            setIncomeSum(res.data[0].sum)
            axios.get(`/api/expense-sum/${ user_id }`)
            .then(results => {
                setExpenseSum(results.data[0].sum);
            })
        })
        .catch(err => console.log(err));
        
        setLeftToBudget(incomeSum - expenseSum);
        setTimeout(() => {
            setLoading(false);
        }, 1000)

        // axios.get(`/api/expense-sum/${ user_id }`)
        //     .then(res => {
        //         setExpenseSum(res.data[0].sum);
        //         setLeftToBudget(incomeSum - expenseSum);
        //         setLoading(false);
        //     })
        //     .catch(err => console.log(err));

        
    }, [user_id, groupName, incomeSum, expenseSum])

    const handleSubmit = () => {
        const medicine = { name: 'medicine', amount: 0.00 },
              doctorVisits = { name: 'doctor visits', amount: 0.00 },
              emergencyFund = { name: 'emergency fund', amount: 0.00 },
              retirement = { name: 'retirement', amount: 0.00 };
        let groupIdOne,
            groupIdTwo;

        axios.post('/api/group', { user_id, groupName: 'health' })
            .then(res => {
                groupIdOne = res.data[0].group_id
                axios.post('/api/category', { group_id: groupIdOne, user_id, categoryName: medicine.name, categoryAmount: medicine.amount })
                    .then(() => {
                        axios.post('/api/category', { group_id: groupIdOne, user_id, categoryName: doctorVisits.name, categoryAmount: doctorVisits.amount })
                    })
            })
            .catch(err => console.log(err));

        axios.post('/api/group', { user_id, groupName: 'savings' })
            .then(res => {
                groupIdTwo = res.data[0].group_id
                axios.post('/api/category', { group_id: groupIdTwo, user_id, categoryName: emergencyFund.name, categoryAmount: emergencyFund.amount })
                    .then(() => {
                        axios.post('/api/category', { group_id: groupIdTwo, user_id, categoryName: retirement.name, categoryAmount: retirement.amount })
                            .then(() => {
                                props.history.push('/dash')
                            })
                    })
            })
            .catch(err => console.log(err));
    }

    // const handleSubmit = () => {
    //     const groupsArr = ['health', 'savings'],
    //           catArr = [
    //             { name: 'medicine', amount: 0.00, group: 'health' },
    //             { name: 'doctor visits', amount: 0.00, group: 'health' },
    //             { name: 'emergency fund', amount: 0.00, group: 'savings' },
    //             { name: 'retirement', amount: 0.00, group: 'savings' }
    //         ];
    //     let group_id
            
    //     groupsArr.map(e => (
    //         axios.post('/api/group', { user_id, groupName: e })
    //         .then(res => {
    //             group_id = res.data[0].user_id
    //             catArr.map(el => {
    //                 if(el.group === e) {
    //                     return (
    //                         axios.post('/api/category', { group_id, user_id, categoryName: el.name, categoryAmount: el.amount  })
    //                             .then()
    //                             .catch(err => console.log(err))
    //                     )
    //                 } else {
    //                     return console.log('no!')
    //                 }
    //             })
    //         })
    //         .catch(err => console.log(err))
    //     ))
    //     props.history.push('/dash')
    // }

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
                            <p>Great job, <span className='first-name'>{ first_name }!</span> Now give every remaining dollar a purpose. Make a new budget line, pay off more debt, or build some savings</p>
                            <button className='continue' onClick={ handleSubmit }>Continue</button>
                            <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
                        </section>
                    </section>
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

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(FinalInsight);