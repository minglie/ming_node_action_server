var M=require("ming_node");
require('./config/index.js');
//global.Db=require('./common/Db.js')
global.M=M;
var app=M.server();
app.listen(10005);
global.app=app;


require("./controller/index.js");

app.get("v",(req,res)=>{
    res.send("2")
})

app.end((req,text)=>{
    M.log("====>",req.url);
    M.log("<====",text);
});