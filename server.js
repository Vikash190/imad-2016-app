var express = require('express'); //library to establish connection
var morgan = require('morgan'); //library help output logs 
var path = require('path');
var Pool= require('pg').Pool;

var config={
    host:'db.imad.hasura-app.io',
    user:'vikash190',
    password: process.env.DB_PASSWORD,
    database:'vikash190',
    port:'5432'
};
var app = express();
app.use(morgan('combined'));




function createTemplate(data){
    
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmlTemplate=`<html>
    <head>
    <title>
      ${title} 
      
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="/ul/style.css" rel="text/css"/>
    </head>
    <body>
    <div>
        <a href="/">home</a>
    </div>
    <hr/>
    <h3>
        ${date.toDateString()}
    </h3>
    <div>
        ${heading}
    </div>
    <div>
       ${content}
    </div>
    
    </body>
    </html>
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter=0;
app.get('/counter', function(req,res){
    counter =counter +1;
    res.send(counter.toString());
});

var names[];
app.get('/submit-name', function(req,res){//url:/submit-name?name-xxxx
    var name=req.query.name;
    
    names.push(name);
    
    //using json we will convert array into strings
    res.send(JSON.stringify(names));
});
app.get('/articles/:articleName', function(req, res){
    
    //SELECT * FROM article WHERE title='\';Delete where a=\'a
    pool.query("SELECT * FROM article WHERE title=$1" , [req.params.articleName] , function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send('Article not found');
            }
            else{
                var articleData=reslt.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    
});
 
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
