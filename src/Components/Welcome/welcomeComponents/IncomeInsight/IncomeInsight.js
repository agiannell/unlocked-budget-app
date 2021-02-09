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
                    <>
                        <h1>${ sum }!</h1>
                        <p>Nice job, { first_name }! Now let's make a plan to tell this money what to do.</p>
                        <Link to='/welcome/expenses-intro'><button>Continue</button></Link>
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

export default connect(mapStateToProps)(IncomeInsight);