const express = require('express')
const app = express();
const port = 3002 
const {nesuite_inventory_item} = require('./apis/post/item')


///AUTO SEND OF DATA EVERY 10 SECONDS
setInterval(()=> { 
    nesuite_inventory_item()
}, 30000)
app.listen(port,() =>{
    console.log('Server Is running in PORT:'+port)
})