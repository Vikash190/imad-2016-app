var express = require('express'); //library to establish connection
var morgan = require('morgan'); //library help output logs 
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    articleOne:{
    title:" article one| vikash",
    heading:"Article one",
    date:"sep 25 2016",
    content:` <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>
              <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>`},
    articeTwo:{ 
    title:" article one| vikash",
    heading:"Article one",
    date:"sep 25 2016",
    content:` <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>
              <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>`
    
},

    articleThree:{ 
    title:" article one| vikash",
    heading:"Article one",
    date:"sep 25 2016",
    content:` <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>
              <p>
                content of the page Student ID: 836726997 Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997Student ID: 836726997 
            </p>`}
};


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
        ${date}
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

app.get('/article-one', function(req, res){
    res.send(createTemplate(articleOne));
});
 
app.get('/article-two', function(req, res){
   res.send(createTemplate(articleTwo));
 });

app.get('/article-three', function(req,res){
   res.send(createTemplate(articleThree));
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
