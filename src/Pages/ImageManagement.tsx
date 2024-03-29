import React from 'react';
import {
    Button,
    Typography,
    CardHeader,
    Paper,
    Tabs,
    Tab,
    CardContent,
    Card,
    Grid,
    makeStyles,
    Container,
    CssBaseline,
    TextField,
  } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from "@material-ui/core/FormControl";
import ResponsiveDrawer from "./Drawer";
import FooterSection from "../Components/Footer";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import BackupIcon from '@material-ui/icons/Backup';
import teal from '@material-ui/core/colors/teal'
import ClearIcon from '@material-ui/icons/Clear';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
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
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
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
    button: {
        margin: theme.spacing(1),
      },
}));


export default function ImageManagement() {
    const { showToast } = React.useContext(ToastContext);

    const classes = useStyles();
    const [imageSrc, setImageSrc] = React.useState()
    const [upload, setUpload]=React.useState(false)
    const [view, setView]=React.useState(false)
    const [users, setUsers] = React.useState<any[]>([]);
    const [state, setState] = React.useState({
        aadhaar: "",
    });
    const [customer, setCustomer] = React.useState({
        mainAadhaar: ""
    });
    const [install, setInstall] = React.useState({ preview: "", raw: "" });
    const [satis, setSatis ]= React.useState({ preview: "", raw: "" });
    const [other, setOther] = React.useState({ preview: "", raw: "" });
    const [errorI , setErrorI]=  React.useState("")
    const [errorS , setErrorS]=  React.useState("")
    const [errorO , setErrorO]=  React.useState("")

    const [installb, setInstallb]= React.useState(false)

    const [satisb, setSatisb]= React.useState(false)

    const [otherb, setOtherb]= React.useState(false)



    const handleFind = async (event: any) => {
        try {
            event.preventDefault();
            if (state.aadhaar) {
                const result = await httpClient("customer/find", "POST", {
                    mainAadhaar: state.aadhaar,
                });
                if (!result.data && result.data === undefined)
                    return showToast("No result found", "error");
                setUsers([result.data]);
                //@ts-ignore
                setCustomer(result.data);
            }
        } catch (error) {
            showToast("Something went wrong", "error");
        }
    };



    
    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };




    const handleChangeInstall = (e: any) => {
        if (e.target.files.length) {
            setInstall({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            setErrorI("")
            setInstallb(true)

        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorI('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setInstall({
                preview: "",
                raw: ""
            });
            setErrorI('Select a valid image size')
        }
    };




    const installRemoveImage = (e: any) => {
        e.preventDefault();

        setInstall({
            preview: "",
            raw: ""
        });
    };

    const satisRemoveImage = (e: any) => {
        e.preventDefault();

        setSatis({
            preview: "",
            raw: ""
        });
    };

    const otherRemoveImage = (e: any) => {
        e.preventDefault();

        setOther({
            preview: "",
            raw: ""
        });
    };


    const handleChangeSatis = (e:any) => {
        if (e.target.files.length) {
            setSatis({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            setSatisb(true)
        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorS('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setSatis({
                preview: "",
                raw: ""
            });
            setErrorS('Select a valid image size')
        }
    };
    const handleChangeOther = (e:any) => {
        if (e.target.files.length) {
            setOther({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            setOtherb(true)
        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorO('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setOther({
                preview: "",
                raw: ""
            });
            setErrorO('Select a valid image size')
        }
    };




    const installUpload = async (e: any, mainAadhaar: string) => {  
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", install.raw);
        formData.append("mainAadhaar", mainAadhaar)
        formData.append("photo_key", "InstalationLetter");
        fetch("http://ec2-13-233-86-104.ap-south-1.compute.amazonaws.com:4001/customer/uploadimages", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data =>
                showToast(data.message, "success"),
                //@ts-ignore
                setInstall({ preview: "", raw: "" })
            )
            .catch((error) => {
                showToast(error.message, "error")
            });
    };


    const othereUpload = async (e: any, mainAadhaar: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", other.raw);
        formData.append("mainAadhaar", mainAadhaar)
        formData.append("photo_key", "otherLetter");
        await fetch("http://ec2-13-233-86-104.ap-south-1.compute.amazonaws.com:4001/customer/uploadimages", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data =>
                showToast(data.message, "success"),
                //@ts-ignore
                setOther({ preview: "", raw: "" })
            )
            .catch((error) => {
                showToast(error.message, "error")
            })
    }


    
    const satisUpload = async (e: any, mainAadhaar: string) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("image", satis.raw);
            formData.append("mainAadhaar", mainAadhaar)
            formData.append("photo_key", "satisfactionLetter");
            const result = await fetch("http://ec2-13-233-86-104.ap-south-1.compute.amazonaws.com:4001/customer/uploadimages", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data =>
                showToast(data.message, "success"),
                        //@ts-ignore
                        setSatis({ preview: "", raw: "" })

            )
            .catch((error) => {
                showToast(error.message, "error")
            })
    }
    



  

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />
            <main>
                <div className={classes.heroContent}  style={{marginRight:"1rem"}}>
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={12} md={12}>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Main Aadhaar No"
                                    variant="outlined"
                                    fullWidth
                                    name="aadhaar"
                                    autoComplete="aadhaar"
                                    autoFocus
                                    value={state.aadhaar}
                                    onChange={handleChange}
                                    type="number"
                                />
                            </form>
                        </Grid>
                        <div className={classes.heroButtons}>
                            {/* @ts-ignore */}
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={handleFind}
                                    >
                                        FIND &  UPLOAD CUSTOMER'S PHOTO
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
            <div style={{marginRight:"1rem"}}>
        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid container  >
                        {users.map((user, i) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                style={{
                                    justifyContent: "center",
                                    alignContent: "center",
                                    textAlign: "left",
                                }}
                            >
                                <Grid item  style={{ marginTop: "-40PX" }}  >
                                    <Card className={classes.card} key={i} >
                                        <CardContent className={classes.cardContent} style={{ marginLeft: "2rem" }}>
                                            <Typography color="textSecondary" gutterBottom>
                                                Customer's Details
                                            </Typography>
                                            <CardHeader
                                                action={
                                                    <div style={{ margin: "0px", padding: "0px" }}>
                                                    </div>
                                                }
                                                //@ts-ignore
                                                title={user.name.toUpperCase()}
                                            />
                                            <CardHeader style={{ textAlign: "center" }} />
                                            <div style={{ marginTop: "-40px" }}>
                                                {/* @ts-ignore */}
                                                <Typography>Sl No : {user.slNo || "NA"}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Name : {user.name.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Family Aadhaar : {user.familyAadhaar}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Mobile No : {user.mobile}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Registration No : {user.regNo || "NA"}
                                                </Typography>
                                                <Typography>
                                                    Consumer No :{user.consumerNo || "NA"}{" "}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Agent : {user.mainAgent.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>
                                                <Typography>Remarks : {user.remarks || "NA"}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Created On : {user.createdAt     || "NA"}</Typography>
                                                <Typography variant="subtitle2" gutterBottom color="primary">Added By : {user.addedBy || "NA"}</Typography>
                                            </div>
                                                   {/* @ts-ignore */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Container className={classes.cardGrid} maxWidth="md">
                        <Grid   container spacing={4}  style={{marginRight:"1rem"}}>
                                        <Grid item xs={12}
                                            sm={12}
                                            md={12}>
                                            <label htmlFor="upload-button1">
                                                {install.preview ? (
                                                    <img src={install.preview} alt="install" width="300" height="300" />
                                                ) : null  }
                                            </label>
                                            <input
                                                type="file"
                                                id="upload-button1"
                                                // style={{ display: "none" }}
                                                onChange={handleChangeInstall}
                                                accept="image/*"
                                            />
                                            <br />
                                            <span style={{color:"red"}}>{errorI}</span>
                                            <br />
                                            <br />
                                                {installb?
                                                <div>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                style={{backgroundColor:"#834bff"}}
                                                
                                                onClick={(e) => { installUpload(e, user.mainAadhaar) }}
                                            >
                                                Submit Installation Photo
                                            </Button>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="inherit"
                                                onClick={installRemoveImage}
                                            >
                                                Reset Photo
                                            </Button>
                                            </div>:null}
                                        </Grid >
                                        <br/>
                                        <Grid item xs={12}
                                            sm={12}
                                            md={12}>
                                                                                        <br/>
                                            <label htmlFor="upload-button2">
                                                {satis.preview ? (
                                                    <img src={satis.preview} alt="dummy" width="300" height="300" />
                                                ) :  null}
                                            </label>
                                            <input
                                                type="file"
                                                id="upload-button2"
                                                // style={{ display: "none" }}
                                                onChange={handleChangeSatis}
                                                accept="image/*"
                                            />
                                               <br />
                                            <span style={{color:"red"}}>{errorS}</span>
                                            <br />
                                            <br />
                                            {satisb?
                                                <div>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                style={{backgroundColor:"#f44336"}}
                                                onClick={(e) => { satisUpload(e, user.mainAadhaar) }}
                                            >
                                                Submit Satisfaction  Photo 
                                            </Button>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="inherit"
                                                onClick={satisRemoveImage}
                                            >
                                                Reset Photo
                                            </Button>
                                            </div>:null}
                                        </Grid>
                                        
                                        <Grid item xs={12}
                                            sm={12}
                                            md={12}>
                                                                                        <br/>
                                            <label htmlFor="upload-button3">
                                                {other.preview ? (
                                                    <img src={other.preview} alt="dummy" width="300" height="300" />
                                                ) :  null}
                                            </label>
                                            <input
                                                type="file"
                                                id="upload-button3"
                                                // style={{ display: "none" }}
                                                onChange={handleChangeOther}
                                                accept="image/*"
                                            />
                                               <br />
                                            <span style={{color:"red"}}>{errorO}</span>
                                            <br />
                                            <br />
                                            {otherb?
                                                <div>
                                            <Button
                                                variant="contained"
                                                style={{backgroundColor:"#8bc34a"}}
                                                color="primary"
                                                onClick={(e) => { othereUpload(e, user.mainAadhaar) }}
                                            >
                                                Submit Other Photo
                                            </Button>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="inherit"
                                                onClick={otherRemoveImage}
                                            >
                                                Reset Photo
                                            </Button>
                                            </div>:null
                                            }
                                        </Grid>
                                    </Grid>
                    </Container>
                            </Grid>
                        ))}
                        
                    </Grid>
        </Container>
        </div>
        <div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
                    <Grid container spacing={4}  style={{marginRight:"1rem"}}>
                        {users.map((user, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:    Installation Letter
                                    </Typography>
                                    <br></br>
                                    {user.InstalationLetter ?
                                    <div>
                                    <img
                                        src={user.InstalationLetter}
                                        alt="new"
                                    />

                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                        href={user.InstalationLetter} target="_blank">
                                    
                                        Download
                                    </Button> */}
                                                                        <a href={user.InstalationLetter} target="_blank">Download</a>


                                    </div>:"No Image found"}
                                </div>
                                <br></br>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:   Satisfaction Letter
                                    </Typography>
                                    <br></br>
                                    {user.satisfactionLetter ?
                                    <div>
                                    <img
                                        src={user.satisfactionLetter}
                                        alt="new"
                                    />
                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                    <a href={user.satisfactionLetter} target="_blank">Download</a>
                                    </div>:"No Image found"}
                                </div>
                                <br></br>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:  Other Document
                                    </Typography>
                                    <br></br>
                                    {user.otherLetter ?
                                    <div>
                                    <img
                                        src={user.otherLetter}
                                        alt="new"
                                    />
                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                    <a href={user.otherLetter} target="_blank">Download</a>
                                    </div>:"No Image found"}

                                </div>
                            </Grid>
                        ))}
                    </Grid>
        </Container>
            </div>
            <FooterSection />
            {/* End footer */}
        </React.Fragment>
    );
}


