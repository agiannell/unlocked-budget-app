import { connect } from 'react-redux';

const Dash = props => {
    console.log(props);
    return (
        <section>
            <h1>Dash</h1>
            <img src={ props.userReducer.user.profile_pic } alt={ props.userReducer.user.first_name } />
        </section>
    )
}

const mapStateToProps = reduxState => ({ userReducer: reduxState.userReducer })

export default connect(mapStateToProps)(Dash);