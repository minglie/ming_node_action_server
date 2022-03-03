/**
 * http://localhost:10005/task/sendSms
 */
app.get("/task/sendSms", async (req, res) => {
   let  r= await  M.post(CONFIG.crmHost+"/home/smsTemp/sendSms",
        {
            "selectedSmsId": "SMS_234041184X",
            "selectedReceiverId": 3,
            "phoneArr": "[]",
            "varParams": "[\"autoBind\"]"
        },
        {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMTAxIiwicGFzc1dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsImlhdCI6MTY0MzE4NTM1NywiZXhwIjoxNjU4NzM3MzU3fQ.linRsMPhQ44nSVyBvkZ3oON_hxiH07mGxtxH-Y215xY"
        }
    )
    let re= M.successResult(r);
    re.code=200;
    res.send(re);
})


app.get("/task/sendSms1", async (req, res) => {
    let  r= await  M.post(CONFIG.crmHost+"/home/smsTemp/sendSms",
        {
            "selectedSmsId": "SMS_234041184",
            "selectedReceiverId": 3,
            "phoneArr": "[]",
            "varParams": "[\"autoBind\"]"
        },
        {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMTAxIiwicGFzc1dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsImlhdCI6MTY0MzE4NTM1NywiZXhwIjoxNjU4NzM3MzU3fQ.linRsMPhQ44nSVyBvkZ3oON_hxiH07mGxtxH-Y215xY"
        }
    )
    let re= M.successResult(r);
    re.code=200;
    res.send(re);
})