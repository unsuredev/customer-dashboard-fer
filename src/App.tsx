import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/Customer';
import ResponsiveDrawer from './Pages/Drawer';
import CustomerStats  from './Pages/CustomerStats'

import { ToastProvider } from "./Common/ToastProvider";


import './App.css';

const App=()=> {
  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/customer" component={Customer} />


            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />

            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/reset" component={Forgot} />
            <Route exact path="/res" component={ResponsiveDrawer} />
            <Route exact path="/cst" component={CustomerStats} />




     
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
