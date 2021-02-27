import React from 'react';
import { Button, Typography, CardHeader, Paper, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from '@material-ui/core';
import FooterSection from '../Components/Footer'
import { useHistory } from "react-router-dom";
import { httpClient } from '../Common/Service'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { ToastContext } from "../Common/ToastProvider";

import ResponsiveDrawer  from './Drawer'



const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    root: {
        margin: theme.spacing(1),
        width: "25ch",
        flexGrow: 1,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
}));


const Home = () => {
    const classes = useStyles();
    let history = useHistory();
    const {showToast}= React.useContext(ToastContext)

    const [users, setUsers] = React.useState<any[]>([]);
    const [today, setDate] = React.useState(new Date());

    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
    const userGreetings = () => {
        return (
            <div>
                <h2>
                    {wish}</h2>
            </div>
        )
    }





    const [state, setState] = React.useState({
        regNo: "",
        mobile: "",
        aadhaar: "",
        consumerNo: "",
        mainAgent:""

    });

    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
        //@ts-ignore
    };



    const handleFind = async (event: any) => {
        try {
            event.preventDefault()
            if (state.mobile) {
                const result = await httpClient("customer/find", "POST", {
                    "mobile": state.mobile, 
                });

                if (!result.data && result.data === undefined) return showToast("No result found", "error");
                setUsers([result.data])
            }
            if (state.aadhaar) {
                const result = await httpClient("customer/find", "POST", {
                    "mainAadhaar": state.aadhaar, 
                });
                if (!result.data && result.data === undefined) return showToast("No result found", "error");
                setUsers([result.data])
            }
            if (state.consumerNo) {
                const result = await httpClient("customer/find", "POST", {
                    "consumerNo": state.consumerNo, 
                });

                if (!result.data && result.data === undefined) return showToast("No result found", "error");
                setUsers([result.data])
            }
            if (state.regNo) {
                const result = await httpClient("customer/find", "POST", {
                    "regNo": state.regNo, 
                });

                if (!result.data && result.data === undefined) return showToast("No result found", "error");
                setUsers([result.data])
            }


        } catch (error) {
            console.log("wrong password", "error")
        }
    }


    

  


    React.useEffect(() => {
       
        document.title = "Customer | JAMAN HP";
    
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />

            <main>

                <div className={classes.heroContent}>
                    <Container maxWidth="md" component="main" >


                        <h2>{userGreetings()}</h2>

                        <Typography
                                        color="secondary"
                                        gutterBottom
                                    >
                                        Find Customer Details
                                  </Typography>
                        <Grid container className="maincontainer" style={{ justifyContent: "center", textAlign: "center" }} >

                            <Grid item xs={12} sm={12} md={3} >
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Main Aadhaar No"
                                        variant="outlined"
                                        fullWidth
                                        type="aadhaar"
                                        name="aadhaar"
                                        autoComplete="aadhaar"
                                        autoFocus
                                        value={state.aadhaar}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} >
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Mobile No"
                                        name="mobile"
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        value={state.mobile}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3}>
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Consumer No"
                                        name="consumer"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={state.consumerNo}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} >
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Registration No"
                                        name="reg"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={state.regNo}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={2} >
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Main Agent"
                                        name="reg"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={state.mainAgent}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid> */}
                            <div style={{ textAlign: "center", justifyContent: "center", margin: "20px" }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={handleFind}

                                >
                                    FIND CUSTOMER
                             </Button>
                            </div>




                            <Grid />


                        </Grid>
                    </Container>
                </div>


                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid className="maincontainer"  style={{textAlign:"center"}}>
                        {users.length === 0 && (
                            <h2>Your Customer data will display here!...........</h2>
                        )}
                    </Grid>
                    {/* {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> : */}
                    <Grid container spacing={4} className="maincontainer"
                    >
                          {users.map((user, i) => (
                        <Grid item xs={12} sm={12} md={6} style={{justifyContent:"center" , alignContent:"center" , textAlign:"center"}}>
                              

                            <Card className={classes.card} key={i}>
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Customer's Details
                                  </Typography>
                                    <CardHeader

                                        action={
                                            <div>
                                                <IconButton aria-label="settings" >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="settings" >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        }
                                        //@ts-ignore
                                        title={user.name}

                                    />
                                    <CardHeader style={{ textAlign: "center" }}

                                    />
                                    {/* @ts-ignore */}
                                    <Typography>Name : {user.name}</Typography>
                                    {/* @ts-ignore */}
                                    <Typography>Mobile No : {user.mobile}</Typography>
                                    {/* @ts-ignore */}

                                    <Typography>Family Aadhaar : {user.familyAadhaar}</Typography>
                                    {/* @ts-ignore */}
                                    <Typography>Registration No : {user.regNo ||"NA" }</Typography>
                                    <Typography>Consumer No :{user.consumerNo ||"NA" } </Typography>
                                    {/* @ts-ignore */}
                                    <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                                    {/* @ts-ignore */}

                                    <Typography>Main Agent : {user.mainAgent}</Typography>
                                    {/* @ts-ignore */}

                                    <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>

                                    {/* <Typography>App Notification enabled : {val.app_notifications_enabled ? "Yes"
                                            : "No"}</Typography> */}
                                    {/* <Typography>Home Name : {val.device.home_name.join()}</Typography> */}
                                    {/* @ts-ignore */}

                                    {/* <Typography>Registered On : {moment(val.createdAt).format('LLLL')}</Typography> */}
                                </CardContent>
                            </Card>
                        </Grid>
                          ))}
                    </Grid>
                </Container>
            </main >
              {/* Footer */}
      
            <FooterSection/>

          
         
            {/* End footer */}
        </React.Fragment >
    );
}


export default Home