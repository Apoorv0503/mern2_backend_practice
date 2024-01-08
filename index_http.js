// console.log("backend server started");

const http= require ("http");


let data= [
    {
    id: "AED",
    name: "United Arab Emirates Dirham",
    min_size: "0.01"
    },
    {
    id: "AFN",
    name: "Afghan Afghani",
    min_size: "0.01"
    },
    {
    id: "ALL",
    name: "Albanian Lek",
    min_size: "0.01"
    },
    {
    id: "AMD",
    name: "Armenian Dram",
    min_size: "0.01"
    },
    {
    id: "ANG",
    name: "Netherlands Antillean Gulden",
    min_size: "0.01"
    },
    {
    id: "AOA",
    name: "Angolan Kwanza",
    min_size: "0.01"
    },
    {
    id: "ARS",
    name: "Argentine Peso",
    min_size: "0.01"
    },
    {
    id: "AUD",
    name: "Australian Dollar",
    min_size: "0.01"
    },
    {
    id: "AWG",
    name: "Aruban Florin",
    min_size: "0.01"
    },
    {
    id: "AZN",
    name: "Azerbaijani Manat",
    min_size: "0.01"
    },
    {
    id: "BAM",
    name: "Bosnia and Herzegovina Convertible Mark",
    min_size: "0.01"
    },
    {
    id: "BBD",
    name: "Barbadian Dollar",
    min_size: "0.01"
    },
    {
    id: "BDT",
    name: "Bangladeshi Taka",
    min_size: "0.01"
    },
    {
    id: "BGN",
    name: "Bulgarian Lev",
    min_size: "0.01"
    },
    {
    id: "BHD",
    name: "Bahraini Dinar",
    min_size: "0.001"
    },
    {
    id: "BIF",
    name: "Burundian Franc",
    min_size: "1"
    },
    {
    id: "BMD",
    name: "Bermudian Dollar",
    min_size: "0.01"
    },
]
const server=http.createServer((req,res)=>{
    // console.log("Hello from server");
    const serverInfo={
    name: "crio server",
    version: "1.0.0",
    currDate:new Date().toLocaleDateString(),
    currTime:new Date().toLocaleTimeString()
    }

    //sending response according to the url recieved
   if(req.url==="/"){
        res.writeHead(
            200,
            {
                "content-type":"text/html"
            }
        );
        res.write(`<h1>Currency Database</h1>`); //Remember the response.write() function needs a String
        res.end();  
    }
     else if(req.url==="/currencies"){
        res.writeHead(
            200,
            {
                "content-type":"application/json"
            }
        );
        res.write(JSON.stringify(data)); //Remember the response.write() function needs a String
        res.end();
    }
    else{
        res.writeHead(
            404,
            {
                "content-type":"text/html" 
            }
        );
        res.write(`<h1>route not defined</h1>`);
        res.end();
    }
    

    
});

server.listen(8082,()=>{
    console.log("Our node server is listening on port 8082");
}); 