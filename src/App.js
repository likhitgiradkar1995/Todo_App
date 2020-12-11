import logo from './logo.svg';
import './App.css';
import UserTask from './Components/UserTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import Admin from './Components/Admin';

function App() {
  return (
    <div className="App">

      {/* <Login/> */}
      {/* <UserTask/> */}
      {/* <SignUp/> */}
      {/* <Admin/> */}

      <Router>
        <div>
          {/* <div>
            <NavLink to='/'>Login</NavLink>
          </div> */}
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/userTask' component={UserTask}/>
          </Switch>

         
        </div>
      </Router>

    </div>
  );
}

export default App;
