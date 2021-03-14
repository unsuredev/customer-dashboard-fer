import React from "react";
import {
  Button,
  Card,
  Grid,
  makeStyles,
  Container,
  CssBaseline,
  TextField,Typography
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import FooterSection from "../Components/Footer";
import jwt_decode from "jwt-decode";

import ResponsiveDrawer from "./Drawer";

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
}));

const Customer = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [lastUser, setLastUser] = React.useState({});
  const [agentList, setAgetList] = React.useState("");

  React.useEffect(() => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name && name != undefined) {
      if(name){
      customer.addedBy = name;
      }
    }
  });

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
      const result = await httpClient("customer/add", "POST", customer);

      if (result.data && result.data != null) {
        setLastUser(result.data.result);
        showToast("user added susccesssfully", "success");
      }
    } catch (error) {
      console.log("something wrong ", "error");
    }
  };

  const handleGet = async () => {
    try {
      const result = await httpClient("agent/getall", "GET");
      console.log("resul==>", result.data.result);
    } catch (error) {
      showToast("Wrong Password! try again", "error");
    }
  };

  const handleChangedropdown = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAgetList(event.target.value as string);
  };

  React.useEffect(() => {
    handleGet();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <Container maxWidth="md" style={{ display: "flex" , marginLeft:"15rem"}}>
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
                      type="number"
                      label="Main Aadhaar"
                      name="mainAadhaar"
                      autoComplete="mainAadhaar"
                      onChange={handleChange}
                      value={customer.mainAadhaar}
                      inputProps={{ maxLength: 12 }}
                      onInput = {(e) =>{
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                    }}

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="faadhaar"
                      type="number"
                      label="Family Adhaar"
                      name="familyAadhaar"
                      autoComplete="faadhaar"
                      onChange={handleChange}
                      value={customer.familyAadhaar}
                      inputProps={{ maxLength: 12 }}
                      onInput = {(e) =>{
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
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
                      onInput = {(e) =>{
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
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
                      onInput = {(e) =>{
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                    }}
                    />
                  </Grid>
  
                  {/* <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={agentList}
                        onChange={handleChangedropdown}
                      >
                        <MenuItem value={agentList}>{agentList}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
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
