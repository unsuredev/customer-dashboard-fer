import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { Button, Link, Container, TableRow, TableContainer, TableHead, TableBody, TableCell, Grid, makeStyles, } from '@material-ui/core';

import { httpClient } from "../Common/Service";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import LaunchIcon from '@material-ui/icons/Launch';
import moment from "moment";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import ResponsiveDrawer  from './Drawer'






import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        }
    },
    roottab: {
        paddingTop: 100,
        width: "100%",
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    }

}));

const CustomerStats = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<any[]>([]);
    let [userlist, setUserlist] = useState<any>([])
    let [mydevices, setMydevices] = useState<any[]>([]);

    const [firstDate, setFirstDate] = React.useState(new Date(moment().startOf('month').format('YYYY-MM-DD')));
    const [lastDate, setLastDate] = React.useState(new Date(moment().endOf('day').format('YYYY-MM-DD')))

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(1);

    let history = useHistory();




    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (index: any) => {
        setOpen(true);
        for (let i = 0; i < userlist.length; i++) {
            if (i == index) {
                mydevices = userlist[i].devices;
                break;
            }

        }
        setMydevices(mydevices)
        return mydevices
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
    }, []);

    const startDateChange = (date: any) => {
        const format = "YYYY-MM-DD"
        let startday: any = moment(date).format(format)
        setFirstDate(startday);
    };
    const endDateChange = (date2: any) => {
        const format = "YYYY-MM-DD"
        let endday: any = moment(date2).format(format);

        // let endday: any = (new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)));
        setLastDate(endday);
    };
    const fetchUsers = async () => {

        try {
            //@ts-ignore
            const result = await httpClient("getStatsData", "POST", {
                "start_date": firstDate, "end_date": lastDate, "project": "SH"
            });
            setUsers(result.data);
            setLoading(false)
            // console.log("users", result.data)


        }
        catch (error) {
            console.error(error);
        }
    }


    const usersByDate = (index: any) => {
        setLoading(true);

        for (let i = 0; i < users.length; i++) {
            if (i == index) {
                userlist = users[i].users;
                break;
            }
        }
        setUserlist(userlist)
        setLoading(false);
        return userlist

    }




    return (
        <React.Fragment>
            <ResponsiveDrawer/>
            <Container >
       

                <Grid container>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                minDate={new Date('2020-10-01')}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Start date"
                                value={firstDate}
                                onChange={startDateChange}
                                maxDate={new Date()}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                            <KeyboardDatePicker
                                minDate={firstDate}
                                margin="normal"
                                id="date-picker-dialog"
                                label="End date"
                                format="dd/MM/yyyy"
                                value={lastDate}
                                onChange={endDateChange}
                                maxDate={new Date()}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={fetchUsers} >
                                FIND
                    </Button>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Container>
            {/* <div>


                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Device details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {mydevices.length > 0 && (
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl No.</TableCell>
                                                <TableCell align="left">Device Active</TableCell>
                                                <TableCell align="left">Access Type</TableCell>
                                                <TableCell align="left">Device Added On</TableCell>
                                                <TableCell align="left">Device Id</TableCell>
                                                <TableCell align="left">Device Type</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {mydevices.map((row: any, i: any) => (
                                                <TableRow key={i}>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell align="left">{row.device_active_for_user ? "Yes"
                                                        : "No"}</TableCell>
                                                    <TableCell align="left">{row.access_type || "N/A"}</TableCell>
                                                    <TableCell align="left">{moment(row.device_add_time).format('LLLL')}</TableCell>
                                                    <TableCell align="left">{row.device_id}</TableCell>
                                                    <TableCell align="left">{row.device_full_type || "N/A"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Ok
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> :
                < Container >

                    <Grid container>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sl No.</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>No of Users</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{row.join_date}</TableCell>
                                        <TableCell>{row.users.length}</TableCell>
                                        <TableCell>
                                            <Link color="primary" onClick={() => usersByDate(i)}>
                                                < ExpandMoreIcon />
                                            </Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                </Container>
            }




            <div className={classes.seeMore}>
                <Link color="primary">
                </Link>
            </div>
            {userlist.length > 0 && (
                <Container >
                    <Grid container>
                        <MaterialTable
                            title="Smitch Customer Stats"
                            isLoading={loading}
                            columns={[
                                { title: 'Sl No', field: 'tableData.id' },
                                { title: 'Name', field: 'name' },
                                { title: 'Mobile', field: 'mobile' || "null" },
                                { title: 'Email', field: 'email' },
                                { title: 'City', field: 'city' || "N/A" },
                                { title: 'Mobile Type', field: 'mobile_type' },
                                { title: 'Login Type', field: 'login_type' },
                                { title: 'App Version', field: 'app_version' },
                                { title: 'Date', field: 'createdAt', type: "date" },

                            ]}

                            data={userlist}
                            options={{
                                exportButton: true,
                                filtering: true,
                                sorting: true,
                                pageSizeOptions: [5, 20, 50, 100, 200, 500]

                            }}
                        />
                    </Grid>
                </Container>
            )}
            <div>
                {userlist.length > 0 && (
                    <Container >
                        <Grid container>

                            <TableContainer component={Paper}>
                                <h2>Extended Users Table</h2>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>

                                        <TableRow>
                                            <TableCell>Sl No.</TableCell>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Mobile No</TableCell>
                                            <TableCell align="left">Email</TableCell>
                                            <TableCell align="left">City</TableCell>
                                            <TableCell align="left">Mobile Type</TableCell>
                                            <TableCell align="left">Login Type</TableCell>
                                            <TableCell align="left">App Version</TableCell>
                                            <TableCell align="left">Date</TableCell>
                                            <TableCell align="left">Device</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userlist.map((row: any, i: any) => (
                                            <TableRow key={i}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell align="left">{row.name || "N/A"}</TableCell>
                                                <TableCell align="left">{row.mobile || "N/A"}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.city || "N/A"}</TableCell>
                                                <TableCell align="left">{row.mobile_type}</TableCell>
                                                <TableCell align="left">{row.login_type}</TableCell>
                                                <TableCell align="left">{row.app_version}</TableCell>
                                                <TableCell align="left">{moment(row.createdAt).format('LLLL')}</TableCell>
                                                <TableCell align="left">{row.devices.length ? <LaunchIcon onClick={() => handleClickOpen(i)} />
                                                    : "N/A"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Container>
                )}
            </div> */}
        </React.Fragment>
    );
}
export default CustomerStats