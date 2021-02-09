import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif';
import './IncomeInsight.css';

const IncomeInsight = props => {
    const groupName = 'income',
          [ sum, setSum ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id, first_name } = props.user;

    useEffect(() => {
        // console.log(`User ID: ${ user_id }`);
        // console.log(`Group Name: ${ groupName }`);
        // console.log(`Sum: ${ sum }`);
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                // console.log(res.data[0])
                setSum(res.data[0].sum)
                setTimeout(setLoading(false), 10000);
            })
            .catch(err => console.log(err));
            
    }, [sum, user_id, groupName])

    // console.log(props);
    return (
        <section>
            { !loading
                ? (
                    <section className='intro'>
                        <section className='intro-content'>
                            <h1>${ sum }!</h1>
                            <p>Nice job, <span className='first-name'>{ first_name }!</span> Now let's make a plan to tell this money what to do.</p>
                            <Link to='/welcome/expenses-intro'><button className='continue'>Continue</button></Link>
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

export default connect(mapStateToProps)(IncomeInsight);