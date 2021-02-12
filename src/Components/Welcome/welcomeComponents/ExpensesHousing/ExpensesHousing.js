import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesHousing.css'

const ExpensesHousing = props => {
    const [ rent, setRent ] = useState({ name: 'mortgage/rent', amount: '' }),
          [ water, setWater ] = useState({ name: 'water', amount: '' }),
          [ naturalGas, setNaturalGas ] = useState({ name: 'natural gas', amount: '' }),
          [ electricity, setElectricity ] = useState({ name: 'electricity', amount: '' }),
          [ cable, setCable ] = useState({ name: 'cable', amount: '' }),
          [ trash, setTrash ] = useState({ name: 'trash', amount: '' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group-init', { user_id, groupName: 'housing' })
            .then(res => {
                // console.log(res.data)
                setGroupInfo(res.data[0])
            })
            .catch(err => console.log(err))
    }, [user_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { group_id } = groupInfo,
              catArr = [rent, water, naturalGas, electricity, cable, trash];

        catArr.map(e => (
            axios.post('/api/category', { group_id, user_id, categoryName: e.name, categoryAmount: +e.amount })
                .then()
                .catch(err => console.log(err))
        ))

        props.history.push('/welcome/expenses-transportation');
    }

    return (
        <section className='intro'>
            <section className='entry'>
                <h1>Enter your<br /> housing expenses</h1>
                <p>These can be edited later.</p>
                <form>
                    <section className='entry-form'>
                        <div className='entry-headers'>
                            <h1>Housing</h1>
                            <div className='entry-money'>
                                <p>Planned</p>
                                <p>Received</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Mortgage/Rent'
                                value={ rent.name }
                                onChange={ e => setRent((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ rent.amount }
                                    onChange={ e => setRent((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Water'
                                value={ water.name }
                                onChange={ e => setWater((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ water.amount }
                                    onChange={ e => setWater((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Natural Gas'
                                value={ naturalGas.name }
                                onChange={ e => setNaturalGas((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ naturalGas.amount }
                                    onChange={ e => setNaturalGas((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Electricity'
                                value={ electricity.name }
                                onChange={ e => setElectricity((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ electricity.amount }
                                    onChange={ e => setElectricity((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Cable'
                                value={ cable.name }
                                onChange={ e => setCable((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ cable.amount }
                                    onChange={ e => setCable((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className='entry-line'>
                            <input 
                                placeholder='Trash'
                                value={ trash.name }
                                onChange={ e => setTrash((s) => ({ ...s, name: e.target.value })) } />
                            <div className='entry-money'>
                                <input
                                    placeholder='$0.00' 
                                    value={ trash.amount }
                                    onChange={ e => setTrash((s) => ({ ...s, amount: e.target.value })) } />
                                <p>$0.00</p>
                            </div>
                        </div>
                    </section>
                    <button className='continue' onClick={ e => handleSubmit(e) }>Continue</button>
                </form>
                <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
            </section>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesHousing);