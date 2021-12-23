import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../user/List";
import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addUserColor: {
  backgroundColor: green[400],
  color: "white"
 },
})

const Dashboard = () => {
 const classes = useStyles();
 const [user, setUser] = useState({
  Username: "",
  pic: ""
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setUser({
   ...user,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:3333/users`, user)
   setStatus(true);
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 if (status) {
  return <Dashboard/>
 }
 return (
  <>
   <Box textAlign="center" className={classes.headingColor} p={1} mb={1}>
    <Typography variant="h3">Users Dashboard</Typography>
   </Box>
   <Grid  justifyContent="center">
    <Grid item md={12} xs={12}>
     <Box textAlign="center" p={1} className={classes.addUserColor} mb={1} ml={1} mr={1}>
      <Typography variant="h5">Add User</Typography>
     
     <form noValidate>
      <Grid container spacing={1} m={2}>
       <Grid item xs={12}>
        <TextField  autoComplete="username" name="username" variant="outlined"  required id="username" label="Name" onChange={e => onTextFieldChange(e)}
        />
        <TextField  autoComplete="pic" name="pic" variant="outlined" required  id="pic" label="profile picture" onChange={e => onTextFieldChange(e)} />
        <Box m={2}>
       <Button type="submit" variant="contained" color="primary" onClick={e => onFormSubmit(e)}>Add User</Button>
      </Box>
       </Grid> 
      </Grid>
     </form>
     </Box>
    </Grid> 

    <Grid item md={12} xs={12} mr={1} ml={1}>
     <List />
    </Grid>
   </Grid>
   
  </>
 )
}

export default Dashboard