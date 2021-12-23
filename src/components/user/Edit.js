import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addUserColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const navigate = useNavigate();
 const [users, setUser] = useState({
 username : "",
  pic: ""
 });
 useEffect(() => {
  async function getUser() {
   try {
    const users = await axios.get(`http://localhost:3333/users/${id}`)
    // console.log(users.data);
    setUser(users.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getUser();
 }, [id]);

 function onTextFieldChange(e) {
  setUser({
   ...users,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`http://localhost:3333/users/${id}`, users)
   navigate("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">React CRUD with API Call</Typography>
   </Box>

   <Grid container justifyContent="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit User</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="username" name="username" variant="outlined" required fullWidth id="username" label="Name" value={users.username} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="pic" name="pic" variant="outlined" required fullWidth id="email" label="Image Url" value={users.pic} onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid>
  </>
 )
}

export default Edit