const mssql = require("mssql/msnodesqlv8");
const db = require("./db.js");
const { poolSQL} = db;
/**
 * 
 * @param {*} message //DATA OR DISPLAY MESSAGE ON RETURN
 * @param {*} code //STATUS CODE
 * @returns 
 */
const statusReturn = (message, code) => {
  let XHeader = [];
  let httpMessage = "";

  switch (code) {
    case 200:
      httpMessage = "Success";
      break;
    case 201:
      httpMessage = "Insert Record Success";
      break;
    case 400:
      httpMessage = "Bad Request";
      break;
    case 404:
      httpMessage = "No Record Found";
      break;
    case 500:
      httpMessage = "Internal Server Error";
      break;
    default:
      break;
  }
  XHeader ={
    HTTP_CODE: code,
    HTTP_MESSAGE: httpMessage,
    HTTP_RESULT: message,
  };
  return XHeader;
};

/**
 * 
 * @param {*} database 
 * @param {*} column 
 * @param {*} table 
 * @param {*} cond //WHERE CLAUSE CONDITIONS
 * @returns 
 */
const sqlSelect  =  async(database, column, table, cond = "")=> {
    let databaseconf;
    let pool;
    //CONDITION FOR MULTIPLE DATABASE
    if (database == "DB") {
      databaseconf = poolSQL;
    } else if (database == "DB") {
      databaseconf = poolSQL;
    } else {
      databaseconf = poolSQL;
    } 
    try {
      pool = await mssql.connect(databaseconf);
      if (cond != "") {
        table = table + " Where " + cond;
      }
      let sqlQuery = `SELECT ` + column + ` from ` + table
      let result =  await pool.request().query(sqlQuery)
      if( result.recordsets == undefined ||  result.recordsets == ''){ 
        return statusReturn(result.recordsets,400); 
      } 
      return statusReturn(result.recordsets, 200); 
    } catch (err) {
      throw new Error(err);
    } finally {
      if (pool) pool.close();
    }
} 
/**
 * 
 * @param {*} database 
 * @param {*} set   //COLUMNS TO UPDATE
 * @param {*} table 
 * @param {*} cond //WHERE CLAUSE CONDITIONS
 * @returns 
 */
async function sqlUpdate(database, set, table, cond = "") { 
    let databaseconf = {};
    if (database === "DB") {
        databaseconf = poolSQL;
    } else if (database === "DB") {
        databaseconf = poolSQL;
    } else {
        databaseconf = poolSQL;
    } 
    let pool;
    try {
        pool = await mssql.connect(databaseconf);
        let sqlQuery = `UPDATE ${table} SET ${set}`;
        if (cond) {
            sqlQuery += ` WHERE ${cond}`;
        }
        let result = await pool.request().query(sqlQuery);
        return statusReturn(result.rowsAffected, 200);
    } catch (err) {
        throw new Error(err);
    } finally {
        if (pool) await pool.close();
    }
}
module.exports = { sqlSelect, sqlUpdate };
