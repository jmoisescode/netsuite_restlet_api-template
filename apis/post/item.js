"use-strick";
 
const {sqlSelect,sqlUpdate} = require('../database/sql_builder.js')   
const {netsuite_post} = require('./post.js') 
const config = require("../config");
const inventory_item_data = require('../sample_data/inventory.js')
const { results } = config;  
///reslet API Script URL
const url = 'https://{{account}}.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script='
const nesuite_inventory_item = async()=>{
    try{  
        
        //access data using database
        //const result = await sqlSelect('DATABASE','COLUMNS','TABLES',"WHERE CLAUSE CONDITIONS");   
        
        const result = inventory_item_data.resdata()
        if(result.HTTP_CODE == 400){
            console.log('NO ROWS TO UPLOAD')
            return 'NO ROWS TO UPLOAD'
        } 
        res = result.HTTP_RESULT[0]
        ///Remove Empty Data and False Value 
        let data = results(res);       
        
        if(data.length > 0) {    
            /**
             * @params url Modify the declared url const variables
             * @params type Modify the Script# & Deployment#
             * @param data return data of result
             */
            let rest = await netsuite_post(url,'script#&deploy=#',data);   

            rest = JSON.parse(rest)     
            return  rest 
        }
    }
    catch(error){
        console.log(error);
        return  error
    } 
}  
module.exports = {
    nesuite_inventory_item 
};  