import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Groups from '../Groups/Groups';

const Dash = props => {
    const [ groups, setGroups ] = useState([]);

    const getGroups = () => {
        axios.get(`/api/groups/${ props.user.user_id }`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <section>
            <h1>Dash</h1>
            { groups.map(e => (
                <Groups 
                    key={ e.group_id }
                    id={ e.group_id }
                    name={ e.name } />
            )) }
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(Dash);