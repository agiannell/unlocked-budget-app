import { connect } from 'react-redux';

const Dash = props => {
    console.log(props);
    return (
        <section>
            <h1>Dash</h1>
        </section>
    )
}

const mapStateToProps = reduxState => ({ userReducer: reduxState.userReducer })

export default connect(mapStateToProps)(Dash);