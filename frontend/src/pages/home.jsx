import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext.jsx";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div
          className="logoSection"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h2>
            Zoom
            <span style={{ color: "#FF9839" }}>ly</span>{" "}
          </h2>
        </div>

        <div className="navActions">
          <div className="historySection" onClick={() => navigate("/history")}>
            <RestoreIcon />
            <span>History</span>
          </div>

          <Button
            className="logoutBtn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>
              High Quality Video Meetings <br />
              <span style={{ color: "#1d8cf8" }}>Made Simple</span>
            </h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button
             
                onClick={handleJoinVideoCall}
                variant="contained"
                disabled={!meetingCode.trim()}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
