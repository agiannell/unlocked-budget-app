import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif';
import './DebtInsight.css'

const DebtInsight = props => {
    const groupName = 'debt',
          [ sum, setSum ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id } = props.user;

    useEffect(() => {
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setSum(res.data[0].sum)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, [user_id, groupName])

    return (
        <section>
            { !loading
                ? (
                    <>
                        <p>Debt is stealing ${ sum } of you hard-earned money!</p>
                        <Link to='/welcome/final-insight'><button>Continue</button></Link>
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

export default connect(mapStateToProps)(DebtInsight);