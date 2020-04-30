var express =require("express");
var app = express();
var bodyParser =  require("body-parser");
var mysql = require("mysql");

//parse application/json
app.use(bodyParser.json());

//create db connection
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'restful_db'
});

//connect to database
conn.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Connected...');
});

//API's

//GET all products
app.get('/api/products',(req,res)=>{
    let sql = "SELECT * FROM product";
    let query = conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null,"response":results}));
    });
});

//GET product by id
app.get('/api/product/:id',(req,res)=>{
    let sql = "SELECT * FROM product where product id ="+req.params.id;
    let query = conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

//adding new product
app.post('/api/products',(req,res)=>{
    let data = {product_name:req.body.product_name,
                product_price:req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql,data,(err,results)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

//Update the product
app.put('/api/product/:id',(req,res)=>{
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"',product_price='"+req.body.product_price+"'WHERE product_id="+req.params.id;
    let query = conn.query(sql,(err,results)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

//Delete the product
app.delete('/api/product/:id',(req,res)=>{
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql,(err,results)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

//SERVER listning
app.listen(3000,()=>{
    console.log('server started on port 3000.....');
});