import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
 UserListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});
const View = () => {
 const classes = useStyles();
 const { id } = useParams();
 const [user, setUser] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
  async function getUser() {
   try {
    const user = await axios.get(`http://localhost:3333/users/${id}`)
    // console.log(user.data);
    setUser(user.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getUser();
 }, [id])

 function handleClick() {
  navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.UserListColor}>
    <Typography variant="h4">User Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Picture</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell align="center">{user.id}</TableCell>
       <TableCell align="center"><Typography variant="h4">{user.username}</Typography></TableCell>
       <TableCell style={{objectFit:"cover",backgroundColor:"gray", borderRadius:"50%",width:150,height:175}} align="center">{user.pic}</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
  </>
 )
}

export default View