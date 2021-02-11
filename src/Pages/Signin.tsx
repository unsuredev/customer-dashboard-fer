import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Components/Copyright';
import { httpClient } from '../Common/Service'
import { CodeJson } from 'mdi-material-ui';
// import PersonOutlinedIcon from "@material-ui/icons/PersonOutlinedIcon";
import { ToastContext } from "../Common/ToastProvider";
import { Link as RouterLink, useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?architecture)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  let history = useHistory();
  const { showToast } = React.useContext(ToastContext);

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault()
      const result = await httpClient("signin", "POST", user)

      if (result && result != null) {
        showToast("Loggedin susccesssfully", "success")
        history.push('/home')

      }
  } catch (error) {
    console.log("wrong password" , "error")
}
  }



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <PersonOutlinedIcon/> */}
          <Typography component="h1" variant="h5">
            JAMAN HP GAS
          </Typography>
          <h4>Code: 13816000</h4>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email "
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Sign Up  here"}
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Forgot your password? reset here"}
                </Link>
              </Grid> */}
            </Grid>
            <Box mt={20}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


export default SignIn;