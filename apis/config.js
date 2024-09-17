'use-strict'
require('dotenv').config();
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

const consumerKey =  process.env.NS_CONSUMER_KEY
const consumerSecret = process.env.NS_CONSUMER_SECRET;
const token = process.env.NS_TOKEN_KEY;
const tokenSecret = process.env.NS_TOKEN_SECRET;
const account = process.env.NS_ACCOUNT;
const url = process.env.NS_URL+'script='


/////Configure OAouth 
 const oauth = OAuth({
    realm: account,
    consumer: { key: consumerKey, secret: consumerSecret },
  
    signature_method: "HMAC-SHA256",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha256", key)
        .update(base_string)
        .digest("base64");
    },
  });   

/**
 * 
 * @param {'POST','GET'} method 
 * @param {*} type 
 * @param {*} headers 
 * @returns 
 */
const conf = (method,type,headers)=>{
    return response={method: method,
      maxBodyLength: Infinity,
      url: url+type,
      headers: { 
              'Content-Type': 'application/json', 
              ...headers },}
  }

///this function removes all empty data to avoid errors when sending requests
  const results =(data)=>{  
    if(data.length > 0) {
      data.forEach(obj => {
        for(let key in obj)
        { 
            if(obj[key] == ''){ 
                delete obj[key] 
            } 
            else{
                let text =  obj[key]; 
                
                
                if (!(typeof text === 'number')){ 
                    //condition to change string to boolean  
                    if(obj[key]=='FALSE'){
                        delete obj[key];
                    }  
                    //condition to change string to boolean
                    else if( obj[key]=='TRUE'){
                        obj[key] =  true 
                    }
                    //condition to trim string
                    else{ 
                      //console.log(key,typeof text === 'number',text)
                        obj[key] =  text.trim();    
                    }   
                }    
            }  
        }  
      });   
    }
    return data
  }
  module.exports = {
    oauth,
    token,
    tokenSecret,
    url,
    conf,
    results
  }