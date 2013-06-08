var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
    
app.get("/", function(req, res) {
  res.redirect("/demo.html");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);

console.log("Visit 127.0.0.1:3000 in your web browser to view the demo.")