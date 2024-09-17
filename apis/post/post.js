"use-strick"; 
const axios = require("axios"); 
const config = require("../config");
const { oauth, token, tokenSecret ,conf } = config;

/**
 * 
 * @param {*} url //RESLET AND REST API URL
 * @param {*} type //MODULE OR SCHEMA 
 * @param {*} data //DATA TO SEND
 * @returns 
 */
const netsuite_post = async(url,type,data)=>{ 
    const requestData = {
        url: url + type , 
        method: "POST", 
    };
    const headers = oauth.toHeader(
            oauth.authorize(requestData, { key: token, secret: tokenSecret })
    );  
    let config = conf('POST',type,headers)

    return response = await axios
    .post(requestData.url,data,config)
    .then(async(response) => {   
        return  JSON.stringify(response.data); 
    })
    .catch((error) => {    
        return   error.response.data;
        
    });
  }

  
  module.exports = {
    netsuite_post
  };  