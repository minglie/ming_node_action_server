async function main(){
    app.installPlugin("http://minglie.gitee.io/ming_file_manager/src/server/plugins/ZxFileManagerPluginByFileDb.js",
        {
            prefix:"t_file",
            tableName:"t_file.json",  //表名
            generateTime:true,   //入库自动生成创建时间
            rootFilePath:"D:/winprod/admin"  //服务器中的静态资源根路径
        },
        {
            remoteStatic:true   //使用远程的静态资源
        });
      console.log("文件管理插件安装成功 访问==>  http://localhost:8888/index.html#/file")
      console.log("代码仓库==> https://gitee.com/minglie/ming_file_manager/blob/master/Readme.md#%E6%96%87%E4%BB%B6%E5%81%9A%E6%95%B0%E6%8D%AE%E6%BA%90")
}


main();