var M=require("ming_node");
const path=require("path");

const devConfig=require("./application-dev.json")
const prodConfig=require("./application-prod.json")
global.CONFIG= process.env.ENV=="dev"?devConfig:prodConfig
global.CONFIG=devConfig;
//设置日志路径
M.setLogPath=function (data){
    M.log_path=path.resolve(__dirname, '../../logs/')+"/"+data+".log";
}
M.setLogPath(new Date().format("yyyy-MM-dd"));


console.log("configStr==>",global.CONFIG)


