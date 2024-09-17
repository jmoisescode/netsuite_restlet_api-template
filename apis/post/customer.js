"use-strick"; 
const {netsuite_post} = require('./post.js') 
const config = require("../config"); 
const { results } = config; 
const customer_data = require('../sample_data/customer.js')
const {sqlSelect,sqlUpdate} = require('../database/sql_builder.js')   
//RestAPI URL
const url = 'https://{{account}}.suitetalk.api.netsuite.com/services/rest/record/v1/'
 
  const netsuite_get_customer = async()=>{
    try{ 
        
        //access data using database
        //const result = await sqlSelect('DATABASE','COLUMNS','TABLES',"WHERE CLAUSE CONDITIONS");    
      
        const result = customer_data.resdata()
        res = result.HTTP_RESULT[0] 
        let data = results(res);    
        //Delcare Empty Data for Address Book
        let addressBookAddress1 = {};  
        let addressBookAddress2 = {}; 
        let addresslist1 = {}
        let addresslist2 = []
        // WHITE LIST OF COLUMNS THAT NEET TO PUSH IN ADDRESS OBJECT ARRAY
        const addressBookList = ['addressBookAddress_text','defaultBilling','defaultShipping','label']
        if(result.HTTP_CODE == 400){ 
            console.log('NO ROWS TO UPLOAD')
            return 'NO ROWS TO UPLOAD'
        }
        data.forEach(obj => {
            for(let key in obj)
            { 
                 //Condition to Overdrive the Address1_
                 if(key.startsWith('Address1_')){
                    let newProp = key.replace('Address1_', '');  
                    const isInlist = addressBookList.includes(newProp)  
                    obj.addressBook = {items:{}}
                    //Checking data is in list of array
                    //This validation is to Overdrive the items of address  
                    if(isInlist){ 
                        obj[newProp]  =  obj[key];  
                         addresslist1[newProp] = obj[newProp]
                    }
                    
                    //This validation is to Overdrive the items of addressBookAddress  
                    else{  
                        addressBookAddress1[newProp] = obj[key];  
                    }   
                    delete obj[key]; 
                } 
                //Condition to Overdrive the Address2_
                else if(key.startsWith('Address2_')){
                    let newProp = key.replace('Address2_', '');     
                    const isInlist = addressBookList.includes(newProp)  
                    //Checking data is in list of array
                    //This validation is to Overdrive the items of address  
                    if(isInlist){ 
                        obj[newProp]  =  obj[key];    
                         addresslist2[newProp] = obj[newProp]
                    }
                    //This validation is to Overdrive the items of addressBookAddress  
                    else{  
                        addressBookAddress2[newProp] = obj[key];  
                    }
                    delete obj[key];
                } 
                
            } 
            //Merging of object to insert in items of Address
            addressBookAddress1 = {addressBookAddress:addressBookAddress1,...addresslist1} 
            addressBookAddress2 = {addressBookAddress:addressBookAddress2,...addresslist2}
            obj.addressBook.items = [addressBookAddress1,addressBookAddress2] ;  
        });     
          
        if(  data.length > 0) {
            let customer = '';

            for  (let index = 0; index <  data.length; index++) { 
                let text =  data[index].externalId ;  
                 text = text.slice(3,text.length) 
                 customer = JSON.stringify(data[index]);  
              
                let rest = await netsuite_post(url,'customer/',customer);         
                if(rest.status == 400){
                    let validate = rest.data['o:errorDetails'][0].detail ; 
                    if(validate == 'Error while accessing a resource. This entity already exists.'){     
                        console.log(rest.data['o:errorDetails']&& text);
                    }
                    else{ 
                        console.log(rest.data['o:errorDetails']&& text);
                    } 
                }
                else{  
                    console.log('Uploaded Success')
                }

            }  
            return data; 
        }
    }
    catch(error){
        console.log(error);
        return  error
    } 
  }
 
  module.exports = {
    netsuite_get_customer
  };  