import React, { useState } from "react";

import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FooterSection from '../Components/Footer'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import { httpClient } from "../Common/Service";
import ResponsiveDrawer from './Drawer'
import FullConsumerTable from './FullConsumerTable'
import { SettingsPhoneTwoTone } from "@material-ui/icons";
import CsvDownloader from 'react-csv-downloader';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white',
        width: 185,
        margin: 10

    },
    margin: {
        margin: theme.spacing(1),

    }, main:
    {
        width: 270
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 3),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
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
    title: {
        fontSize: 14,
    },
    tab: {
        width: "100%",
    },
}));


const Reports = () => {
    const classes = useStyles();
    const [customerTotal, setCustomerTotal] = React.useState("")
    const [memberCount, setMemberCount] = React.useState("")
    const [agent, setAgent] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [show, setShow] = React.useState(true)
    const [button ,setButton] = React.useState(true)
    const [limit, setLimit]=React.useState(500)
    const [newdata, setNewdata]=React.useState([])




    const fetchCount = async () => {

        try {
            //@ts-ignore
            const result = await httpClient("customer/count", "POST", { "project": "GET_COUNT" })

            if (result.data) {
                setCustomerTotal(result.data.CustomerCount)
                setMemberCount(result.data.userCount)
                setAgent(result.data.agentCount)
                setLoading(false)

            }

        }
        catch (error) {
            console.error(error);
        }
    }




    const fetcCustomers=()=>{
        setLimit(limit+500)
        setLoading(true)
        fetch(`http://ec2-13-233-86-104.ap-south-1.compute.amazonaws.com:4001/customer/getcustomers`)
            .then(resp => resp.json())
            .then(resp => {
                setNewdata(resp.data)
                setShow(true)
            })
    }
    


    React.useEffect(() => {
        document.title = "Live Stats | JAMAN HP GAS  "
        fetchCount()
        fetcCustomers()
    }, []);

    const column = [
        { displayName: 'Sl No', id: 'tableData.id' },
        { displayName: "Old SlNo", id: "slNo" },
        { displayName: "Name", id: "name" },
        { displayName: "Main Aadhaar", id: "mainAadhaar" },
        { displayName: "Family Aadhaar", id: "familyAadhaar" },
        { displayName: "Mobile", id: "mobile" },
        { displayName: "Reg No", id: '' },
        { displayName: "Consumer No", id: '' },
        { displayName: "Main Agent", id: 'mainAgent' },
        { displayName: "Sub Agent", id: 'subAgent' },
        { displayName: "Remarks", id: 'remarks' }
    ];


    return (
        <React.Fragment>

            <CssBaseline />
            <ResponsiveDrawer />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Card className={classes.main}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Total  Customer
                                        </Typography>
                                        {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> : <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {customerTotal}
                                        </Typography>
                                        }
                                    </CardContent>
                                    {show ? <CsvDownloader
                                        filename="JamanHpGas"
                                        extension=".csv"
                                        separator=";"
                                        wrapColumnChar="'"
                                        datas={newdata}
                                        columns={column} text="ONE CLICK DOWNLOAD ALL CUSTOMER  DATA" /> : <Button variant="contained">Wait! Downlod Not ready yet</Button>}
                                </Card>
                            </Grid>
                        </div>
                        <Grid container spacing={4} style={{ marginTop: "50px" }}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Total Members
                                        </Typography>
                                        <Link href="/member" onClick={(e:any)=>e.preventDefault}>
                                        {memberCount}
                                        </Link>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Total Agents
                                        </Typography>
                                        <Link href="/agentlist" onClick={(e:any)=>e.preventDefault}>
                                        {agent}
                                        </Link>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </main>
            <Container>
                <FullConsumerTable />
            </Container>
            <FooterSection />

        </React.Fragment >
    );


}

export default Reports