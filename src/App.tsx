import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red'

import SignIn from './Pages/Signin';
import SignUpAgent from './Pages/AgentRegister';
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/Customer';
import ResponsiveDrawer from './Pages/Drawer';
import CustomerStats  from './Pages/CustomerStats';
import Reports from './Pages/Report'

import { ToastProvider } from "./Common/ToastProvider";
import './App.css';


const theme = createMuiTheme(

  {
    palette: {
      primary: blue,
      secondary: red,
    },
  });



const App=()=> {
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <ToastProvider>
        <Router>
          <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/customer" component={Customer} />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/agent" component={SignUpAgent} />
            <Route exact path="/reset" component={Forgot} />
            <Route exact path="/res" component={ResponsiveDrawer} />
            <Route exact path="/cst" component={CustomerStats} />
            <Route exact path="/reports" component={Reports} />

          
          </Switch>
        </Router>
      </ToastProvider>
    </div>
    </ThemeProvider>

  );
}

export default App;
