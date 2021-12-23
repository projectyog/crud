import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 UserListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  marginRight:1,
  marginLeft:1,
 },
})

const List = () => {
 const classes = useStyles();
 const [users, setUsers] = useState([]);

 useEffect(() => {
  async function getAllUser() {
   try {
    const users = await axios.get("http://localhost:3333/users")
    // console.log(users.data);
    setUsers(users.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllUser();
 }, [])

 const handleDelete = async id => {
  await axios.delete(`http://localhost:3333/users/${id}`);
  var newuser = users.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setUsers(newuser);
 }


 return (
  <>
   <Box textAlign="center" m={1} className={classes.UserListColor}>
    <Typography variant="h6">Users List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow  style={{ backgroundColor: "#6161ff"}}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}> picture</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
       users.map((user, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell style={{objectFit:"cover",backgroundColor:"gray", borderRadius:"50%",width:75,height:75}} align="center"><img src = {user.pic} alt="NoImage"/></TableCell>
          <TableCell align="center"><Typography variant="h4">{user.username}</Typography></TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${user.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${user.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List


