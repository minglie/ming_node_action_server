var M=require("ming_node");
require('./config/index.js');
//global.Db=require('./common/Db.js')
global.M=M;
var app=M.server();
app.listen(8888);
global.app=app;

//安装插件
require("./installPlugin/index")

app.get("v",(req,res)=>{
    res.send("2")
})

