import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Snackbar } from "@mui/material";
import { Fade, Slide, Grow } from "@mui/material";


const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }

      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

 return (
   <ThemeProvider theme={defaultTheme}>
     <Box
       sx={{
         minHeight: "100vh",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         background: "linear-gradient(135deg, #667eea, #764ba2)",
         backgroundSize: "200% 200%",
         animation: "gradientMove 8s ease infinite",
         "@keyframes gradientMove": {
           "0%": { backgroundPosition: "0% 50%" },
           "50%": { backgroundPosition: "100% 50%" },
           "100%": { backgroundPosition: "0% 50%" },
         },
       }}
     >
       <CssBaseline />

       <Grow in timeout={600}>
         <Paper
           elevation={10}
           sx={{
             width: 420,
             p: 5,
             borderRadius: 4,
             backdropFilter: "blur(20px)",
             backgroundColor: "rgba(255,255,255,0.15)",
             border: "1px solid rgba(255,255,255,0.3)",
             boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
             transition: "0.4s",
             "&:hover": {
               transform: "translateY(-5px)",
             },
           }}
         >
           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
             }}
           >
             <Avatar
               sx={{
                 m: 1,
                 bgcolor: "#fff",
                 color: "#764ba2",
                 width: 56,
                 height: 56,
               }}
             >
               <LockOutlinedIcon />
             </Avatar>

             <Fade in timeout={500}>
               <Typography
                 variant="h5"
                 sx={{ mb: 3, fontWeight: 600, color: "#fff" }}
               >
                 {formState === 0 ? "Welcome Back" : "Create Account"}
               </Typography>
             </Fade>

             <Box sx={{ mb: 3 }}>
               <Button
                 variant={formState === 0 ? "contained" : "outlined"}
                 onClick={() => setFormState(0)}
                 sx={{
                   mr: 1,
                   borderRadius: 5,
                   px: 3,
                   background:
                     formState === 0
                       ? "linear-gradient(45deg,#ff6a00,#ee0979)"
                       : "transparent",
                   color: "#fff",
                   borderColor: "#fff",
                   transition: "0.3s",
                 }}
               >
                 Sign In
               </Button>

               <Button
                 variant={formState === 1 ? "contained" : "outlined"}
                 onClick={() => setFormState(1)}
                 sx={{
                   borderRadius: 5,
                   px: 3,
                   background:
                     formState === 1
                       ? "linear-gradient(45deg,#ff6a00,#ee0979)"
                       : "transparent",
                   color: "#fff",
                   borderColor: "#fff",
                   transition: "0.3s",
                 }}
               >
                 Sign Up
               </Button>
             </Box>

             <Box component="form" noValidate sx={{ width: "100%" }}>
               <Slide
                 direction="down"
                 in={formState === 1}
                 mountOnEnter
                 unmountOnExit
               >
                 <TextField
                   margin="normal"
                   required
                   fullWidth
                   label="Full Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   sx={{
                     input: { color: "#fff" },
                     label: { color: "#ddd" },
                   }}
                 />
               </Slide>

               <TextField
                 margin="normal"
                 required
                 fullWidth
                 label="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 sx={{
                   input: { color: "#fff" },
                   label: { color: "#ddd" },
                 }}
               />

               <TextField
                 margin="normal"
                 required
                 fullWidth
                 label="Password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 sx={{
                   input: { color: "#fff" },
                   label: { color: "#ddd" },
                 }}
               />

               <p style={{ color: "#ff4d4d", minHeight: "20px" }}>{error}</p>

               <Button
                 type="button"
                 fullWidth
                 variant="contained"
                 sx={{
                   mt: 2,
                   py: 1.3,
                   borderRadius: 5,
                   fontWeight: 600,
                   background: "linear-gradient(45deg,#ff6a00,#ee0979)",
                   transition: "0.3s",
                   "&:hover": {
                     transform: "scale(1.05)",
                   },
                 }}
                 onClick={handleAuth}
               >
                 {formState === 0 ? "Login" : "Register"}
               </Button>
             </Box>
           </Box>
         </Paper>
       </Grow>

       <Snackbar
         open={open}
         autoHideDuration={4000}
         message={message}
         onClose={() => setOpen(false)}
       />
     </Box>
   </ThemeProvider>
 );

}






// ------------------------------------------------------------
// import * as React from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Paper,
//   Box,
//   Typography,
//   Snackbar,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { AuthContext } from "../contexts/AuthContext.jsx";

// const theme = createTheme();

// export default function Authentication() {
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [error, setError] = React.useState("");
//   const [message, setMessage] = React.useState("");
//   const [formState, setFormState] = React.useState(0);
//   const [open, setOpen] = React.useState(false);

//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

//   const handleAuth = async () => {
//     try {
//       if (formState === 0) {
//         await handleLogin(username, password);
//       }

//       if (formState === 1) {
//         let result = await handleRegister(name, username, password);
//         setUsername("");
//         setPassword("");
//         setMessage(result);
//         setError("");
//         setFormState(0);
//         setOpen(true);
//       }
//     } catch (err) {
//       let message = err.response?.data?.message || "Something went wrong";
//       setError(message);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "linear-gradient(135deg,#8EC5FC,#E0C3FC)",
//         }}
//       >
//         <CssBaseline />

//         <Paper
//           elevation={10}
//           sx={{
//             width: 380,
//             p: 5,
//             borderRadius: 3,
//             boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
//           }}
//         >
//           <Box textAlign="center">
//             <Typography variant="h5" fontWeight={600} mb={3}>
//               {formState === 0 ? "Login Form" : "Signup Form"}
//             </Typography>

//             {/* Toggle */}
//             <Box
//               sx={{
//                 display: "flex",
//                 backgroundColor: "#f2f2f2",
//                 borderRadius: 50,
//                 p: 0.5,
//                 mb: 3,
//               }}
//             >
//               <Button
//                 fullWidth
//                 onClick={() => setFormState(0)}
//                 sx={{
//                   borderRadius: 50,
//                   textTransform: "none",
//                   fontWeight: 500,
//                   background:
//                     formState === 0
//                       ? "linear-gradient(90deg,#0f5fc2,#1d8cf8)"
//                       : "transparent",
//                   color: formState === 0 ? "#fff" : "#555",
//                 }}
//               >
//                 Login
//               </Button>

//               <Button
//                 fullWidth
//                 onClick={() => setFormState(1)}
//                 sx={{
//                   borderRadius: 50,
//                   textTransform: "none",
//                   fontWeight: 500,
//                   background:
//                     formState === 1
//                       ? "linear-gradient(90deg,#0f5fc2,#1d8cf8)"
//                       : "transparent",
//                   color: formState === 1 ? "#fff" : "#555",
//                 }}
//               >
//                 Signup
//               </Button>
//             </Box>

//             {/* Form */}
//             {formState === 1 && (
//              <TextField
//                    margin="normal"
//                    required
//                    fullWidth
//                    label="Full Name"
//                    value={name}
//                    onChange={(e) => setName(e.target.value)}
//                    sx={{
//                      input: { color: "#fff" },
//                      label: { color: "#ddd" },
//                    }}
//                  />
//             )}

//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               sx={{
//                 input: { color: "#fff" },
//                 label: { color: "#ddd" },
//               }}
//             />

//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{
//                 input: { color: "#fff" },
//                 label: { color: "#ddd" },
//               }}
//             />
// {/* 
//             {formState === 0 && (
//               <Typography
//                 variant="body2"
//                 color="primary"
//                 textAlign="left"
//                 mt={1}
//               >
//                 Forgot password?
//               </Typography>
//             )} */}

//             <Box
//               sx={{
//                 color: "red",
//                 minHeight: 24,
//                 fontSize: 14,
//                 mt: 1,
//               }}
//             >
//               {error}
//             </Box>

//             <Button
//               fullWidth
//               onClick={handleAuth}
//               sx={{
//                 mt: 2,
//                 py: 1.3,
//                 borderRadius: 50,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 color: "#fff",
//                 background: "linear-gradient(90deg,#0f5fc2,#1d8cf8)",
//                 boxShadow: "0 8px 20px rgba(29,140,248,0.3)",
//               }}
//             >
//               {formState === 0 ? "Login" : "Signup"}
//             </Button>

//             <Typography variant="body2" mt={3}>
//               {formState === 0 ? (
//                 <>
//                   Create an account?{" "}
//                   <span
//                     style={{ color: "#1d8cf8", cursor: "pointer" }}
//                     onClick={() => setFormState(1)}
//                   >
//                     Signup now
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <span
//                     style={{ color: "#1d8cf8", cursor: "pointer" }}
//                     onClick={() => setFormState(0)}
//                   >
//                     Login
//                   </span>
//                 </>
//               )}
//             </Typography>
//           </Box>
//         </Paper>

//         <Snackbar
//           open={open}
//           autoHideDuration={4000}
//           message={message}
//           onClose={() => setOpen(false)}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// }
