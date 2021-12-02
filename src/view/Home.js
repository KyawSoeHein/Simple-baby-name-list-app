import React from 'react'
import { Button, CardActionArea, TextField } from "@mui/material";

const Home = () => {
    return (
    <div>
       <Button
        variant="outlined"
        // onClick={() => _handleDialog()}
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        Add new baby name
      </Button>
    </div>)
}

export default Home;