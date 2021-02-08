import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ExpensesHousing.css'

const ExpensesHousing = props => {
    const [ rent, setRent ] = useState({ name: 'mortgage/rent', amount: '0.00' }),
          [ water, setWater ] = useState({ name: 'water', amount: '0.00' }),
          [ naturalGas, setNaturalGas ] = useState({ name: 'naturalGas', amount: '0.00' }),
          [ electricity, setElectricity ] = useState({ name: 'electricity', amount: '0.00' }),
          [ cable, setCable ] = useState({ name: 'cable', amount: '0.00' }),
          [ trash, setTrash ] = useState({ name: 'trash', amount: '0.00' }),
          [ groupInfo, setGroupInfo ] = useState({}),
          { user_id } = props.user;

    useEffect(() => {
        axios.post('/api/group', { user_id, groupName: 'housing' })
            .then(res => {
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
        <section>
            <h1>Enter your housing expenses</h1>
            <h2>These can be edited later.</h2>
            <form>
                <div className='expenses-entry-headers'>
                    <h1>Housing</h1>
                    <h3>Planned</h3>
                    <p>Received</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ rent.name }
                        onChange={ e => setRent((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ rent.amount }
                        onChange={ e => setRent((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ water.name }
                        onChange={ e => setWater((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ water.amount }
                        onChange={ e => setWater((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ naturalGas.name }
                        onChange={ e => setNaturalGas((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ naturalGas.amount }
                        onChange={ e => setNaturalGas((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ electricity.name }
                        onChange={ e => setElectricity((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ electricity.amount }
                        onChange={ e => setElectricity((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ cable.name }
                        onChange={ e => setCable((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ cable.amount }
                        onChange={ e => setCable((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
                <div className='expense-line'>
                    <input 
                        value={ trash.name }
                        onChange={ e => setTrash((s) => ({ ...s, name: e.target.value })) } />
                    <input 
                        value={ trash.amount }
                        onChange={ e => setTrash((s) => ({ ...s, amount: e.target.value })) } />
                    <p>$0.00</p>
                </div>
            </form>
            <button onClick={ e => handleSubmit(e) }>Continue</button>
            <span onClick={ props.history.goBack }>&#60; Back</span>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(ExpensesHousing);