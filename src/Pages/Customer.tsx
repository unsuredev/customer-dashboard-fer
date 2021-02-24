import React from 'react';
import { Button, Typography, CardHeader, Paper, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Copyright from '../Components/Copyright';
import { httpClient } from '../Common/Service';
import { ToastContext } from "../Common/ToastProvider";


import ResponsiveDrawer  from './Drawer'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        marginLeft:"auto"
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
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
}));

const cards = [1, 2, 3];

const Customer = () => {
    const classes = useStyles();
    const {showToast} = React.useContext(ToastContext);
    const [lastUser , setLastUser]=React.useState({})


    const [customer, setCustomer] = React.useState({
        name: "",
        mainAadhaar: "",
        consumerNo: "",
        familyAadhaar: "",
        regNo: "",
        mainAgent: "",
        subAgent: "",
        remarks: "",
        mobile:""

    });

    const handleChange = (event: any) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
        //@ts-ignore
    };

    const handleRegister = async (e: any) => {
        try{
        e.preventDefault()
        const result = await httpClient("customer/add", "POST", customer)

        if (result.data && result.data != null) {
            setLastUser(result.data.result)
            showToast("user added susccesssfully", "success")
         
  
        }
    } catch (error) {
      console.log("something wrong " , "error")
  
    }
}


    


    return (
        <React.Fragment>
               <CssBaseline />
                <ResponsiveDrawer/>
                <Container maxWidth="md" style={{display:"flex"}}>
       
                <Grid item  xs={12} sm={12} md={6} >
           
                <div >
                    <h2>Add New Customer</h2>
                    <form className={classes.form} noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
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
                            <Grid item xs={12} >
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
                                />
                            </Grid>
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
                <Grid item  xs={12} sm={12} md={6}>
                    <div style={{margin:"5px" , textAlign:"center" ,marginLeft:"10px" , marginTop:"40px"}}>
                        <p>Last upadted user's data </p>
                             {/* @ts-ignore */}
                   <h4>   Name : {lastUser.name}</h4>
                        {/* @ts-ignore */}
                         <h3> Main Aadhaar :{lastUser.mainAadhaar}</h3>
                             {/* @ts-ignore */}
                         <h4> Main Agent :{lastUser.mainAgent}</h4>

                    </div>
                 
        

   </Grid>
   
    
                    </Container>
        
         
    
        
    

        </React.Fragment >
    );
}


export default Customer