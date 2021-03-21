import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Components/Copyright";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ResponsiveDrawer from "./Drawer";
import Switch from '@material-ui/core/Switch';

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
  table: {
    minWidth: 650,
  },
}));




const MemberSignUp = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [list, setList] = React.useState([])
  const [show, setShow] = React.useState(false)

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleSwitch = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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


  React.useEffect(() => {
    handleUsersList()
  }, [])


  const handleUsersList = async () => {
    try {
      const result = await httpClient("users/get", "GET");
      console.log("resul==>", result.data.result);
      setList(result.data.result)
      console.log("users", list)
    } catch (error) {
      showToast("Wrong Password! try again", "error");
    }
  };


  return (
    <React.Fragment>
      <ResponsiveDrawer />
      <Container component="main" maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
            <Typography component="h1" variant="h5">
              JAMAN HP GAS
              </Typography>
            <h4>Code: 13816000</h4>
          </Grid>

        </Grid>


      </Container>
      <Container component="main" maxWidth="md">
        <Grid container  >
          <Grid item xs={12} sm={12} md={12} >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell >Email Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((user, i) => (
                    //@ts-ignore
                    <TableRow key={user.name}>
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {/* @ts-ignore */}
                        {user.name}
                      </TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="left">{user.email}</TableCell>

                      <TableCell >   <Switch
                        checked={state.checkedA}
                        onChange={handleSwitch}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      /></TableCell>



                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>

        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => setShow(true)}
          >
            Add New member
                </Button>
        </Grid>

      </Container>

      {show &&

        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.paper}>
                {/* <PersonOutlinedIcon/> */}


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
      }



    </React.Fragment>
  );
};

export default MemberSignUp;
