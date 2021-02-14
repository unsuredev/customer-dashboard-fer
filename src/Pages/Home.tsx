import React from 'react';
import { Button, Typography, CardHeader, Paper, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from '@material-ui/core';

import Link from '@material-ui/core/Link';
import Copyright from '../Components/Copyright';
import Header from '../Components/Header';
import { useHistory } from "react-router-dom";


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
        reg: "",
        mobile: "",
        aadhaar: "",
        consumerNo: "",

    });

    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
        //@ts-ignore
    };



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
            <Header/>
      
            <main>

                <div className={classes.heroContent}>
                    <Container maxWidth="md" component="main" >
                        
                    
                        <h2>{userGreetings()}</h2>

                        <p>Find Customer Details </p>
                        <Grid container className="maincontainer"  style={{justifyContent:"center" , textAlign:"center"}} >

                            <Grid item xs={12}  sm={12} md={3} >
                                <form className={classes.form}  noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Aadhaar No"
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
                            
                            <Grid item  xs={12}  sm={12} md={3} >
                                <form className={classes.form}  noValidate autoComplete="off">
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
                            
                            <Grid item  xs={12}  sm={12} md={3}>
                                <form className={classes.form}  noValidate autoComplete="off">
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
                            <Grid item xs={12}  sm={12} md={3} >
                                <form className={classes.form}  noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Registration No"
                                        name="reg"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={state.reg}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            <div style={{textAlign:"center" , justifyContent:"center" , margin:"20px"}}>
                            <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"

                                >
                                    FIND CUSTOMER
                </Button>
                                </div>
                  



                            <Grid />

                        
                        </Grid>
                    </Container>
                </div>
                {/* Hero unit */}

                <Container className={classes.cardGrid} maxWidth="md">

                <div style={{display:"flex" }}>

            

                    <Grid item xs={12} sm={4} md={4}>
                        <Card className={classes.card}>

                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Todays
                             </Typography>
                                <Typography>
                                    258
                                </Typography>
                            </CardContent>

                                </Card>
                        </Grid>
                        
                    <Grid item xs={12} sm={4} md={4}>
                    <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                This Month
                    </Typography>
                            <Typography>
                                25801
                    </Typography>
                        </CardContent>

                    </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}>
                    <Card className={classes.card}>

<CardContent className={classes.cardContent}>
    <Typography gutterBottom variant="h5" component="h2">
        Total
</Typography>
    <Typography>
        2580025
</Typography>
</CardContent>

</Card>
</Grid>
</div>
            
        

         
        </Container>
      </main >
    {/* Footer */ }
    < footer className = { classes.footer } >
        <Typography variant="h6" align="center" gutterBottom>
            JAMAN HP 
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            jaman.mushidabad@hpgas.hpcl.co.in
        </Typography>
        <Copyright />
      </footer >
    {/* End footer */ }
    </React.Fragment >
  );
}


export default Home