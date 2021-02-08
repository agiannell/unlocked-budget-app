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
            
            setLoading(false)
    }, [user_id, groupName])

    return (
        <section>
            { !loading
                ? (
                    <>
                        <p>Awesome! You're giving ${ sum } this month!</p>
                        <Link to='/welcome/debt-intro'><button>Continue</button></Link>
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

export default connect(mapStateToProps)(GivingInsight);