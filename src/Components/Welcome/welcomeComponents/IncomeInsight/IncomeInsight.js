import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './IncomeInsight.css';

const IncomeInsight = props => {
    const groupName = 'income',
          [ sum, setSum ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id, first_name } = props.user;

    useEffect(() => {
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                // console.log(res.data)
                setSum(res.data.sum)
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

export default connect(mapStateToProps)(IncomeInsight);