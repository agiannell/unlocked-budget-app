import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif';
import './GivingInsight.css'

const GivingInsight = props => {
    const groupName = 'giving',
          [ sum, setSum ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id } = props.user;

    useEffect(() => {

        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setSum(res.data[0].sum)
            })
            .catch(err => console.log(err));
            
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [user_id, groupName])

    return (
        <section>
            { !loading
                ? (
                    <section className='intro'>
                        <section className='intro-content'>
                            <h1>Awesome! You're giving <span>${ sum }</span> this month!</h1>
                            <Link to='/welcome/debt-intro'><button className='continue'>Continue</button></Link>
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

export default connect(mapStateToProps)(GivingInsight);