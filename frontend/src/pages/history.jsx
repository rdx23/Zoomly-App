import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


import { IconButton } from "@mui/material";
export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

 return (
   
   <Box
     sx={{
       minHeight: "100vh",
       background: "linear-gradient(135deg, #e3f2fd, #f5f7fa)",
       px: { xs: 2, sm: 3, md: 4 },
       py: { xs: 4, sm: 5 },
     }}
   >
     {/* Header */}
     <Box
       sx={{
         textAlign: "center",
         marginBottom: "40px",
       }}
     >
       

       <Typography
         variant="h4"
         sx={{
           fontWeight: "bold",
           color: "#1976d2",
           letterSpacing: "1px",
           cursor: "pointer",
           fontSize: {
             xs: "1.6rem",
             sm: "2rem",
             md: "2.2rem",
           },
         }}
         onClick={() => {
           routeTo("/home");
         }}
       >
         Zoomly
       </Typography>

      

       <Typography
         variant="subtitle1"
         sx={{
           color: "gray",
           marginTop: "8px",
           fontSize: { xs: "0.9rem", sm: "1rem" },
         }}
       >
         Your Meeting History
       </Typography>
     </Box>

     {/* Cards Container */}
     <Box
       sx={{
         display: "flex",
         flexWrap: "wrap",
         justifyContent: "center",
        //  gap: "20px",
         gap: { xs: 2, sm: 3 },
       }}
     >
       {meetings.length !== 0 ? (
         meetings.map((e, i) => (
           <Card
             key={i}
             sx={{
               width: {
                 xs: "100%", // full width on mobile
                 sm: 300,
                 md: 320,
               },
               maxWidth: 400,
               borderRadius: "16px",
               boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
               transition: "0.3s",
               "&:hover": {
                 transform: "translateY(-5px)",
                 boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
               },
             }}
           >
             <CardContent>
               <Typography
                 variant="h6"
                 sx={{ fontWeight: 600, marginBottom: "8px" }}
               >
                 Meeting Code
               </Typography>

               <Typography
                 sx={{
                   fontSize: "18px",
                   color: "#1976d2",
                   fontWeight: "bold",
                 }}
               >
                 {e.meetingCode}
               </Typography>

               <Typography
                 sx={{
                   marginTop: "12px",
                   color: "gray",
                 }}
               >
                 Date: {formatDate(e.date)}
               </Typography>
             </CardContent>
           </Card>
         ))
       ) : (
         <Typography
           variant="h6"
           sx={{
             marginTop: "50px",
             color: "gray",
           }}
         >
           No meetings yet
         </Typography>
       )}
     </Box>
   </Box>
 );

}
