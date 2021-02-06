import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashHeader from '../DashHeader/DashHeader'
import Groups from '../Groups/Groups';
import './Dash.css';

const Dash = props => {
    const [ groups, setGroups ] = useState([]);

    useEffect(() => {
        const getGroups = () => {
            axios.get(`/api/groups/${ props.user.user_id }`)
                .then(res => {
                    setGroups(res.data)
                })
                .catch(err => console.log(err))
        };

        if(!props.user.user_id) {
            props.history.push('/signin')
        }
        getGroups();
    }, [props.user.user_id, props.history])

    // console.log(props)
    return (
        <section>
            <DashHeader push={ props.history.push } />
            <section className='dash-main'>
                <section className='budget'>
                    { groups.map(e => (
                        <Groups 
                        key={ e.group_id }
                        id={ e.group_id }
                        name={ e.name } />
                    )) }
                    <button className='add-group'>Add Group</button>
                    <div className='empty'></div>
                </section>
                <section className='chart'>
                    Chart stuff
                </section>
            </section>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(Dash);