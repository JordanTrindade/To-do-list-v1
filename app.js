const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

var itens = [];
var estudos = [];

app.get("/", (req, res) =>{

    var today = new Date();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    }
    day = today.toLocaleDateString('en-BR', options);
    res.render('list', {dia : day,  tituloLista : 'tarefa', tarefa : itens});

})


app.get("/estudo", (req,res)=>{
    var today = new Date();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    }
    day = today.toLocaleDateString('en-BR', options);
    res.render('list', {dia : day, tituloLista : 'estudo', tarefa : estudos});
})

app.post("/", (req, res)=>{
    console.log(req.body);
    var item = req.body.tarefa;
    if(req.body.enviar === 'tarefa'){
        itens.push(item);
        res.redirect("/");
    }else{
        estudos.push(item);
        res.redirect("/estudo");
    }
    
})

app.get("/about", (req, res)=>{
    res.render('about');
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor funcionando");
})