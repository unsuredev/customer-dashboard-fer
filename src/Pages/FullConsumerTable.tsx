import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Grid } from '@material-ui/core';

export default function FullConsumerTable() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [limit, setLimit]=React.useState(500)
    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Old SlNo", field: "slNo" },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Reg No", field: '' },
        { title: "Consumer No", field: '' },
        { title: "Main Agent", field: 'mainAgent' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
    ]




const fetcCustomerData=()=>{
    setLimit(limit+500)
    setLoading(true)
    fetch(`https://jamanenterprise.herokuapp.com/customer/getAll?page=1&limit=${limit}`)
        .then(resp => resp.json())
        .then(resp => {
            setData(resp.data)
            setLoading(false)
        })
}



    React.useEffect(() => {
        fetcCustomerData()
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid xs={6} md={4} lg={4} sm={4}>
            &nbsp; &nbsp; &nbsp; <Button
                            variant="contained"
                            color="primary"
                            onClick={fetcCustomerData}
                        >
                            load More
                    </Button>
            </Grid>
       
   
            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="Jaman Hp Consumer Data"
                        data={data}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF'
                            }
                        }}

                    />
                }
            </Container>
        </React.Fragment>
    );
}




