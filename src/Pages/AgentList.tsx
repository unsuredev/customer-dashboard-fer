import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import { Container, Grid } from '@material-ui/core';
import ResponsiveDrawer from "./Drawer";



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, address: string, mobile: number) {
  return { name, address, mobile };
}



const AgentList=()=> {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [list ,setList] = React.useState([])


  React.useEffect(()=>{
    handleAgentlist()
},[])


  const handleAgentlist = async () => {
    try {
      const result = await httpClient("agent/getall", "GET");
      console.log("resul==>", result.data.result);
      setList(result.data.result)
      console.log("skdfsfh" , list)
    } catch (error) {
      showToast("Wrong Password! try again", "error");
    }
  };

  return (
      <React.Fragment>
          <ResponsiveDrawer/>
          <Container>
              <Grid container  >
                  <Grid item xs={12} sm={12} md={12} >
                  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Sl No</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell align="right">Mobile Number</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((agent , i) => (
              //@ts-ignore
            <TableRow key={agent.name}>
                 <TableCell align="left">{i+1}</TableCell>
              <TableCell component="th" scope="row">
                   {/* @ts-ignore */}
                {agent.name}
              </TableCell>
               {/* @ts-ignore */}
              <TableCell align="right">{agent.mobile}</TableCell>
               {/* @ts-ignore */}
               
              <TableCell align="right">{agent.address}</TableCell>
               
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                  </Grid>

              </Grid>

          </Container>
      </React.Fragment>

  );
}

export default AgentList