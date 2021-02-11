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

const cards = [1, 2, 3];

const Home = () => {


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
    const classes = useStyles();

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
            <main>

                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Grid container className="maincontainer">

                            <Grid item>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Aadhaar No"
                                        variant="outlined"
                                        type="aadhaar"
                                        name="aadhaar"
                                        autoComplete="aadhaar"
                                        autoFocus
                                        value={state.aadhaar}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            OR
                            <Grid item>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Mobile No"
                                        name="mobile"
                                        variant="outlined"
                                        type="tel"
                                        value={state.mobile}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            OR
                            <Grid>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Consumer No"
                                        name="consumer"
                                        variant="outlined"
                                        type="text"
                                        value={state.consumerNo}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>
                            <Grid>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Registration No"
                                        name="reg"
                                        variant="outlined"
                                        type="text"
                                        value={state.reg}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid>



                            <Grid />

                            <Grid container>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"

                                >
                                    FIND CUSTOMER
                </Button>
                            </Grid>
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