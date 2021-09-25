import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';




const  Copyright = ()=> {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          JAMAN HP GAS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        <h1 style={{fontFamily:"Caramel"}}>  Designed and developed by    
        <a href="https://www.facebook.com/unsuredev/" target="_blank" >Jamal</a></h1>
     
      </Typography>
    );
  }

  export default Copyright ;

