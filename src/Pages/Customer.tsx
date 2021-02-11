import React from 'react';
import { Button, Typography, CardHeader, Paper, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Copyright from '../Components/Copyright'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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


    const [customer, setCustomer] = React.useState({
        name: "",
        mobile: "",
        mainAadhaar: "",
        consumerNo:"",
        faadhaar: "",
        mainAgent: "",
        subAgent: "",
        remarks: "",
        regNo:""

    });

    const handleChange = (event: any) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
        //@ts-ignore
    };

    const handleRegister = (e: any) => {

        e.preventDefault()
        console.log("customer data", customer)
    }


    return (
        <React.Fragment>
               <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        JAMAN HP GAS
          </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>Add New Customer</h2>
                    <form className={classes.form} noValidate>
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
                                    label="Family Adhaar"
                                    name="faadhaar"
                                    autoComplete="faadhaar"
                                    onChange={handleChange}
                                    value={customer.faadhaar}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile"
                                    type="mobile"
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
                                    name="Registration"
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
                                    type="text"
                                    id="consumerNo"
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

            </Container>

        </React.Fragment >
    );
}


export default Customer