import welcomeRoutes from './welcomeRoutes';
import './Welcome.css'

const Welcome = props => {
    return(
        <section>
            { welcomeRoutes }
        </section>
    )
}

export default Welcome;