const M=require("ming_node");

const myDbconfig=global.CONFIG.mySqlConfig;
const Db=M.getMySql(myDbconfig);

//Db.display_sql_enable=true

module.exports = Db;