import { Switch, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import SignIn from './Components/SignIn/SignIn';
import Dash from './Components/Dash/Dash';
import Profile from './Components/Profile/Profile';
import Welcome from './Components/Welcome/Welcome';

export default (
    <Switch>
        <Route exact path='/' component={ Landing } />
        <Route path='/signin' component={ SignIn } />
        <Route path='/dash' component={ Dash } />
        <Route path='/profile' component={ Profile } />
        <Route path='/welcome' component={ Welcome } />
    </Switch>
)