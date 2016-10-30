var express = require('express'); //library to establish connection
var morgan = require('morgan'); //library help output logs 
var path = require('path');
var Pool = require('pg').Pool;
var app=express();


app.use(morgan('combined'));

var config = {
    user :'vikash190',
    database :'vikash190',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var articles={ 
    'article-one':{
      title:"article-one",
      heading:"article-one",
      date: "25 sep 2016",
      content:` <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
    `
    },
    'article-two':{
        title:"article-two",
      heading:"article-two",
      date: "26 sep 2016",
      content:` <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
     <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p><p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
    `
    },
    'article-three':{
         title:"article-three",
      heading:"article-three",
      date: "27 sep 2016",
      content:` <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
     <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p><p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
  <p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p><p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p><p>this is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first articlethis is my first article</p>
    `
    }
};

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    
    pool.query("SELECT * FROM test", function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
        var htmlTemplate=`
        <html>
        
        <head>
        ${title}
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        
        <link href='/ui/style.css' rel="stylesheet"/>
        </head>
        
        <body>
        <div class="container">
        <div>
        <a href='/'>home</a>
        </div>
        ${heading}
        ${date}
        
        ${content}
        </div>
        </body>
        </html>
        `;
        
        return htmlTemplate;
}
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 
 var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});


var names[];
app.get('/submit-name/:name', function(req,res){
    
    var name=req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});

 app.get('/articles/:articleName', function(req, res){
     
     
    
     pool.query("SELECT * FROM article WHERE title ='" + req.params.articleName +"'", function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }    
        else{
            if(result.rows.length===0){
                res.status(404).send("article not found");
            }
            else{
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
        }
     });
     
   

});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});





var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
