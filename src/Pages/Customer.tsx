import React from "react";
import {
  Button,
  Card,
  Grid,
  makeStyles,
  Container,
  CssBaseline,
  TextField, Typography
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import FooterSection from "../Components/Footer";
import jwt_decode from "jwt-decode";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ResponsiveDrawer from "./Drawer";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  },
  root: {
    margin: theme.spacing(1),
    width: "25ch",
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const Customer = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [lastUser, setLastUser] = React.useState({});
  const [agentList, setAgetList] = React.useState([]);
  const [disabled, setDisabled]=React.useState(false)
  const CHARACTER_LIMIT = 12;


  React.useEffect(() => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name && name != undefined) {
      if (name) {
        customer.addedBy = name;
      }
    }

    async function getCharacters() {
      const response = await fetch("https://jamanenterprise.herokuapp.com/agent/getall");
      const body = await response.json();
      console.log("res==>", body.data.result)
      setAgetList(body.data.result)
      //@ts-ignore
      setAgetList(body.data.result.map(({ name  }) => ({ label: name, value: name })));
      console.log("res==>2", agentList)

    }
    getCharacters();
  }, []);


  const [customer, setCustomer] = React.useState({
    name: "",
    mainAadhaar: "",
    consumerNo: "",
    familyAadhaar: "",
    regNo: "",
    mainAgent: "",
    subAgent: "",
    remarks: "",
    mobile: "",
    addedBy: "",
  });

  const handleChange = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  };

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();
      setDisabled(true)
      const result = await axios.post(BASE_URL + "customer/add", customer)
      if (result.data.data && result.data != null) {
        setLastUser(result.data.data.result);
        showToast("Consumer added susccesssfully", "success");
        setDisabled(false)
      }
    } catch (error) {
      if (error) {
        showToast(error.response.data.message, "error")
      }
    }
  };



  


  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <Container maxWidth="md" style={{ display: "flex", marginLeft: "15rem" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <h2>Add New Customer</h2>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                      value={customer.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mainAadhaar"
                      type="text"
                      label="Main Aadhaar"
                      name="mainAadhaar"
                      autoComplete="mainAadhaar"
                      onChange={handleChange}
                      value={customer.mainAadhaar}
                      inputProps={{
                        maxlength: CHARACTER_LIMIT
                      }}

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="faadhaar"
                      type="text" label="Family Adhaar"
                      name="familyAadhaar"
                      autoComplete="faadhaar"
                      onChange={handleChange}
                      value={customer.familyAadhaar}
                      inputProps={{
                        maxlength: CHARACTER_LIMIT
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="mobile"
                      label="Mobile"
                      type="number"
                      id="mobile"
                      autoComplete="current-mobile"
                      onChange={handleChange}
                      value={customer.mobile}
                      onInput={(e) => {
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="regNo"
                      label="Registration  No"
                      type="text"
                      id="Registration"
                      autoComplete="Registration"
                      onChange={handleChange}
                      value={customer.regNo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="consumerNo"
                      label="Consumer No"
                      id="consumerNo"
                      type="number"
                      autoComplete="consumerNo"
                      onChange={handleChange}
                      value={customer.consumerNo}
                      onInput={(e) => {
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="mainAgent"
                      label="Main Agent"
                      type="mainAgent"
                      id="mainAgent"
                      autoComplete="mainAgent"
                      onChange={handleChange}
                      value={customer.mainAgent}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">Main Agent *</InputLabel>
                      <Select
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        inputProps={{ 'aria-label': 'Without label' }}
                        name="mainAgent"
                      >
                        {agentList.map(item => (
                          <MenuItem
                            //@ts-ignore
                            key={item.label} value={item.value} >{item.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="subAgent"
                      label="Sub Agent"
                      type="subAgent"
                      id="subAgent"
                      autoComplete="subAgent"
                      onChange={handleChange}
                      value={customer.subAgent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="remarks"
                      label="Remarks"
                      type="remarks"
                      id="remarks"
                      autoComplete="remarks"
                      onChange={handleChange}
                      value={customer.remarks}
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleRegister}
                >
                  Register Customer
                </Button>
              </form>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            style={{ marginTop: "50px", marginLeft: "2rem" }}
          >
            <Card className={classes.card}>
              <div
                style={{
                  margin: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                  marginTop: "40px",
                }}
              >

                <h2>Last saved registration's details</h2>
                {/* @ts-ignore */}
                <Typography>Name : {lastUser.name}</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {/* @ts-ignore */}
                Main Aadhaar :{lastUser.mainAadhaar}
                </Typography>
                {/* @ts-ignore */}
                <Typography> Family Aadhaar :{lastUser.familyAadhaar}</Typography>
                {/* @ts-ignore */}
                <Typography> Mobile: {lastUser.mobile}</Typography>
                {/* @ts-ignore */}


                <Typography variant="subtitle2" gutterBottom>
                  {/* @ts-ignore */}
                Registration No :{lastUser.regNo}
                </Typography>
                {/* @ts-ignore */}
                <Typography> Consumer No :{lastUser.consumerNo}</Typography>
                {/* @ts-ignore */}
                <Typography> Main Agent :{lastUser.mainAgent}</Typography>
                {/* @ts-ignore */}
                <Typography> Sub Agent :{lastUser.subAgent}</Typography>
                {/* @ts-ignore */}
                <Typography> Remarks  :{lastUser.remarks}</Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <FooterSection />
    </React.Fragment>
  );
};

export default Customer;
