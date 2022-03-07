const FileBaseRpcApi= require("ming_node/plugins/BaseRpcApi/FileBaseRpcApi");
const fs=require("fs");

class ZxFileManagerPlugin extends  FileBaseRpcApi {

    constructor(props) {
        super(props);
        this.rootFilePath= props.rootFilePath;
    }

    async list({page,num,order,queryCase}){
        let {keyword,...dbCase}=queryCase;
        if(keyword){
            dbCase["$n"]=keyword;
        }
        let r= this.fileDb.listByPage({page,num,caseObj:dbCase,order});
        return r;
    }

    async replace(obj){
        obj.t=new Date().format("yyyy-MM-dd hh:mm:ss");
        let r= this.add(obj);
        return r;
    }

    async addFile(req,res){
        let {d,p,n,f}=req.params;
        let r= await this.replace({d,p,n,f})

        M.mkdir(this.rootFilePath+"/"+p);
        res.send(M.result())

    }

    async upload(req){
        function bufferSplit(buffer, delimiter) {
            let arr = [];
            let n = 0;
            // 当分隔符存在时
            while((n = buffer.indexOf(delimiter)) != -1) {
                // 将第一个分隔符前边的数据添加到数组中
                arr.push(buffer.slice(0, n));
                // 将第一个分隔符后的部分重新赋值给buffer
                buffer = buffer.slice(n + delimiter.length);
            }
            // 将最后的buffer数据添加到数组中
            arr.push(buffer);
            return arr;
        }
        // req.headers 包含与当前请求相关的Headers对象
        //console.log(req.headers['content-type']);
        // 'multipart/form-data; boundary=----WebKitFormBoundary1VOd0XNAiE8Tv2Vh'
        // 获取分隔符
        let boundary ="--" + req.headers['content-type'].split("; ")[1].split("=")[1];
        //console.log(boundary);
        let arr = [];
        // buffer是自定义的一个参数，表示一个二进制的数据
        req.on("data", (buffer) => {
            arr.push(buffer);
        });

        return new Promise((resolve,reject)=>{
            req.on("end", () => {
                let buffer = Buffer.concat(arr); // 将二进制数据拼接到一起
                // 1.以分隔符切割
                let res = bufferSplit(buffer, boundary);
                //console.log(res);
                // 2.去掉数组第一个和最后一个null
                res.pop(); // 删除第一个元素
                res.shift(); // 删除最后一个元素
                let formDate={};
                // 3.处理每一个元素
                res.forEach((item) => {
                    let buffer = item.slice(2, item.length-2);
                    let index = buffer.indexOf("\r\n\r\n");
                    let info = buffer.slice(0, index).toString();
                    let data = buffer.slice(index+4);
                    if (info.indexOf("\r\n") != -1) {
                        // 如果有回车换行，即文件
                        let arr2 = info.split("\r\n")[0].split("; ");
                        let name = arr2[1].split("=")[1]; // let定义的变量只在｛｝中有效，所以可以用name
                        name = name.substring(1, name.length-1);
                        let filename = arr2[2].split("=")[1];
                        filename = filename.substring(1, filename.length-1);
                        if(formDate.dir){
                            let dir=formDate.dir;
                            if(formDate.dir=="/"){
                                dir=""
                            }
                            // formDate.dir=formDate.dir.replaceAll("/","");
                            let filePath=`${this.rootFilePath}${dir}/${filename}`;
                            fs.writeFile(filePath, data, err => {
                                if(err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        fileName:filePath,
                                        fileSize:data.length,
                                        formDate
                                    })
                                }
                            })
                        }
                    } else {
                        let name = info.split("; ")[1].split("=")[1]; // 获取name的值
                        name = name.substring(1, name.length-1); // 从第一个开始截取
                        data = data.toString();
                        formDate[name]=data
                    }})
            })
        })
        // 因为服务器收到的数据是二进制的，所以需要对数据进行一些处理
    }


    install(app,args){

        super.install(app,args);


        //如果使用远程静态资源
        if(args && args.remoteStatic){
            app.use("/",(req,res)=>{
                if(req.url=="/favicon.ico"){
                    return
                }
                if(req.isStaticRequest()){
                    res.renderUrl("http://minglie.gitee.io/ming_file_manager/src/static"+req.url);
                }
            })
        }

        app.use(`${this.prefix}/upload`,async (req,res)=>{
            let r= await this.upload(req);
            let d=r.formDate.dir;
            let p=r.fileName.replace(this.rootFilePath,"");
            let s=  r.fileSize;
            let n=M.getFileNameByUrl(r.fileName);
            this.replace({
                p:p,
                d:d,
                s:s,
                n:n,
                f:1
            })
            res.send(r)
        });

        app.get(`${this.prefix}/preview`,async (req,res)=>{
            const {p,isDownLoad=false}=req.params;
            let fileRealPath=   this.rootFilePath+p;
            res.sendFile("file:"+fileRealPath,isDownLoad);
        });
        app.post(`${this.prefix}/add_dir`,async (req,res)=>{
            await this.addFile(req,res);
        })
    }
}

module.exports = ZxFileManagerPlugin;