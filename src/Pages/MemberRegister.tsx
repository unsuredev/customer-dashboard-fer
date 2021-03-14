import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Components/Copyright";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";

import ResponsiveDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/1600x900/?architecture)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MemberSignUp = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const result = await httpClient("signup", "POST", user);
    localStorage.setItem("access_token", result.data.token);

    if (result && result != null) {
      showToast("Registered susccesssfully", "success");
    }
  };

  return (
    <React.Fragment>
      <ResponsiveDrawer />

      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.paper}>
              {/* <PersonOutlinedIcon/> */}
              <Typography component="h1" variant="h5">
                JAMAN HP GAS
              </Typography>
              <h4>Code: 13816000</h4>
              <h2>Register a Member</h2>

              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Name "
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={user.name}
                  onChange={handleChange}
                />
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
                  name="mobile"
                  label="Mobile No"
                  type="number"
                  id="mobile"
                  autoComplete="mobile"
                  value={user.mobile}
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
                  Add Team member
                </Button>

                <Box mt={20}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default MemberSignUp;
