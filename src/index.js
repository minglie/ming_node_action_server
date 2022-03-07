var M=require("ming_node");
require('./config/index.js');
//global.Db=require('./common/Db.js')
global.M=M;
var app=M.server();
app.listen(8888);
global.app=app;


app.get("v",(req,res)=>{
    res.send("2")
})

app.installPlugin("http://minglie.gitee.io/ming_file_manager/src/server/plugins/ZxFileManagerPluginByFileDb.js",
    {
        tableName:"t_file",  //表名
        generateTime:true,   //入库自动生成创建时间
        rootFilePath:"D:/winprod/admin"  //服务器中的静态资源根路径
    },
    {
        remoteStatic:true   //使用远程的静态资源
    });