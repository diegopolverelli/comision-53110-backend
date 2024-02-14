const http=require("http")

const PORT=3000

const server=http.createServer((req, res)=>{    // request / response


    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    res.end("Server Básico con http...!!!")
})

server.listen(PORT, ()=>{
    console.log("Server online en puerto",PORT)
})
