import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './DebtInsight.css'

const DebtInsight = props => {
    const groupName = 'debt',
          [ sum, setSum ] = useState(0),
          [ loading, setLoading ] = useState(true),
          { user_id } = props.user;

    useEffect(() => {
        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setSum(res.data.sum)
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
                            <h1 id='debt'>Debt is stealing <span>${ sum }</span> of you hard-earned money!</h1>
                            <Link to='/welcome/final-insight'><button className='continue'>Continue</button></Link>
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

export default connect(mapStateToProps)(DebtInsight);