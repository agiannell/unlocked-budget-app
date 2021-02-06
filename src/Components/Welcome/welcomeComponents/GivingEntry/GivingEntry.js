import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './GivingEntry.css'

const GivingEntry = props => {
    return (
        <section>
            GivingEntry
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(GivingEntry);