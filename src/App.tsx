import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/Customer'

import { ToastProvider } from "./Common/ToastProvider";


import './App.css';

const App=()=> {
  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/cst" component={Customer} />


            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />

            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/reset" component={Forgot} />


     
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
