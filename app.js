var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json())
app.use('/api/v1/campaign', routes);
app.use('/api/v1/campaign/active', routes);
app.use('/api/v1/campaign/closed', routes);

app.listen(app.get("port"), function(){
    console.log(`Server started listening on port: ${app.get("port")}`);
});
