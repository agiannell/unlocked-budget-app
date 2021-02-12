import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import './GivingEntry.css'

const GivingEntry = props => {
    const [ charity, setCharity ] = useState({ name: 'charity', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          [ loading, setLoading ] = useState(false),
          [ isFocused, setIsFocused ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group-init', { user_id, groupName: 'giving' })
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
        <section className='intro'>
            { !loading
                ? (
                    <section className='entry'>
                        <h1>Enter your<br /> giving expenses</h1>
                        <p>These can be edited later.</p>
                        <form>
                            <section className='entry-form'>
                                <div className='entry-headers'>
                                    <h1>Giving</h1>
                                    <div className='entry-money'>
                                        <p>Planned</p>
                                        <p>Received</p>
                                    </div>
                                </div>
                                <div className='entry-line'>
                                    <input 
                                        onFocus={ () => setIsFocused(true) }
                                        onBlur={ () => setIsFocused(false) }
                                        placeholder='Charity'
                                        value={ charity.name }
                                        onChange={ e => setCharity((s) => ({ ...s, name: e.target.value })) } />
                                    <div className='entry-money'>
                                        <input 
                                            onFocus={ () => setIsFocused(true) }
                                            onBlur={ () => setIsFocused(false) }
                                            placeholder='$0.00'
                                            value={ charity.amount }
                                            onChange={ e => setCharity((s) => ({ ...s, amount: e.target.value })) } />
                                        <p>$0.00</p>
                                    </div>
                                </div>
                            </section>
                            <button className='continue' onClick={ e => handleSubmit(e) }>Continue</button>
                        </form>
                        <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
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

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(GivingEntry);