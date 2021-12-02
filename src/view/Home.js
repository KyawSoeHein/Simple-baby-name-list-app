import React, { useState } from "react";
import "../Home.css";

//redux
import { useSelector } from "react-redux";

//materialUI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Button, CardActionArea, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Home = () => {
  const dense = useSelector((state) => state.baby_list);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function _handleDialog(action) {
    setOpen(!open);
  }

  return (
    <div className="home">
      <List
        dense
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {dense.map((value, index) => {
          return (
            <Card
              sx={{
                display: "flex",
                marginTop: 2,
                width: 250,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#706FC7",
                borderRadius: 16,
                // transition: width,
                // ":hover": {
                //   width: 252,
                // },
              }}
              key={index}
            >
              <CardActionArea>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={value.name}
                    className={value.strike ? "crossed-line" : ""}
                  />
                </ListItem>
              </CardActionArea>
            </Card>
          );
        })}
      </List>

      <Button
        onClick={() => _handleDialog()}
        variant="outlined"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        Add new baby name
      </Button>

      <Dialog open={open} style={{ padding: 32 }}>
        <DialogTitle>Baby Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a child name which is not blank and no longer than two phrases.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Baby Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(value) => setName(value.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _handleDialog()}>Cancel</Button>
          <Button onClick={() => _handleDialog(1)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
