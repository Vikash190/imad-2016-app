var express = require('express'); //library to establish connection
var morgan = require('morgan'); //library help output logs 
var path = require('path');

var app=express();


app.use(morgan('combined'));

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
 
 app.get('/:articleName', function(req, res){
     
     var articleName= req.params.articleName;
    res.send(createTemplate(articles[articleName]));

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
