import React, { useState, useEffect } from "react";
import "../Home.css";
import StyledInputElement from "./SearchBox";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  _addNewBaby,
  _changeStrike,
  _copyOriginalList,
  _clearOriginalList,
  _searchBaby,
  _sortBabyList,
  _changeCurrentSort,
} from "../redux/reducer";

//MaterialUI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import InputUnstyled from "@mui/base/InputUnstyled";
import { Button, CardActionArea, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";

import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";

let re = /^[a-zA-Z]+\s?[a-zA-Z]*$/;

const Home = () => {
  const dense = useSelector((state) => state.baby_list);
  const original_list = useSelector((state) => state.original_list);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState({ status: false, msg: "" });

  // localStorage.clear();

  useEffect(() => {
    if (search.length > 0 && dense.length > 0) {
      if (original_list.length === 0) {
        dispatch(_copyOriginalList());
      }
      dispatch(_searchBaby(search));
    } else {
      if (original_list.length > 0) {
        dispatch(_clearOriginalList());
      }
    }
  }, [search]);

  function _handleDialog(action) {
    if (action === 1) {
      if (name.length === 0) {
        setError({ status: true, msg: "Name can't be blank" });
        return;
      } else {
        if(re.test(name)) {
          callReduxToAddNewBaby();
        } else {
          setError({ status: true, msg: "letters and only one space is allowed" });
          return;
        }
      }
    }
    setOpen(!open);
    setError({ status: false, msg: "" });
  }

  function callReduxToAddNewBaby() {
    dispatch(_addNewBaby(name));

    if (error.status === true) {
      setError({ status: false, msg: "" });
    }
  }

  function _handleCardPress(index) {
    if (index < dense.length) {
      dispatch(_changeStrike(index));
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        color: "#ecf0e6",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  function sortBabyList(option) {
    dispatch(_sortBabyList(option));
  }

  return (
    <div className="home">
      <InputUnstyled
        components={{ Input: StyledInputElement }}
        placeholder="Search"
        onChange={(value) => setSearch(value.target.value)}
      />

      <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-native"
          style={{ marginRight: 16 }}
        >
          Sort By
        </InputLabel>

        <NativeSelect
          sx={{
            backgroundColor: "white",
            borderRadius: 16,
            width: 120,
          }}
          defaultValue={0}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          onChange={(value) => sortBabyList(value.target.value)}
        >
          <option value={0}>Input Time</option>
          <option value={1}>Alphbet</option>
          <option value={2}>Length</option>
        </NativeSelect>
      </div>

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
              <CardActionArea onClick={() => _handleCardPress(index)}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(value.name)} />
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
        variant="outlined"
        onClick={() => _handleDialog()}
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
            error={error.status}
            helperText={error.msg}
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
