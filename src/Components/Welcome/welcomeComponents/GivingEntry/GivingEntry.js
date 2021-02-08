import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import loadingSpinner from '../../../../img/loading.gif';
import './GivingEntry.css'

const GivingEntry = props => {
    const [ charity, setCharity ] = useState({ name: 'charity', amount: '0.00' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'giving' })
            .then(res => {
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo;
        setLoading(true);

        axios.post('/api/category', { group_id, user_id, categoryName: charity.name, categoryAmount: +charity.amount })
            .then(() => {
                props.history.push('/welcome/giving-insight');
            })
            .catch(err => console.log(err))
        
    }

    return (
        <section className=''>
            { !loading
                ? (
                    <>
                        <h1>Enter your giving expenses</h1>
                        <h2>These can be edited later.</h2>
                        <form>
                            <div className='expenses-entry-headers'>
                                <h1>Giving</h1>
                                <h3>Planned</h3>
                                <p>Received</p>
                            </div>
                            <div className='expense-line'>
                                <input 
                                    value={ charity.name }
                                    onChange={ e => setCharity((s) => ({ ...s, name: e.target.value })) } />
                                <input 
                                    value={ charity.amount }
                                    onChange={ e => setCharity((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </form>
                        <button onClick={ e => handleSubmit(e) }>Continue</button>
                        <span onClick={ props.history.goBack }>&#60; Back</span>
                    </>
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

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(GivingEntry);