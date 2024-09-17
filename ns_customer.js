const express = require("express");
const app = express();   
const port = 3001; 
const {netsuite_get_customer} = require('./apis/post/customer')    
 setInterval(()=> {
  netsuite_get_customer()
  }, 10000)
 
app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});