const Api= require("ming_node/plugins/BaseRpcApi/MysqlBaseRpcApi");
let api = new Api({tableName:"member_statistics",generateTime:true})

app.use(api);

app.get("member_statistics/getTableSchema",async (req,res)=>{
    let tableScamer=await api.dbBaseMapper.getTableSchema();
    res.send(M.successResult(tableScamer))
})