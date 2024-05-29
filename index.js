// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api" , function(req, res){
  const date = new Date()

  res.json({unix: date.getTime(),
    utc : date.toUTCString()
})

})


app.get("/api/:data", function(req, res){
    let data = req.params.data

    let parseData = null

    if(data.indexOf("-") === -1){
      parseData = parseInt(data, 10)
    } else{
      parseData = data
    }


    const date = new Date(parseData)

    const unixTime = date.getTime()
    const utcTime = date.toUTCString()

    if (utcTime === "Invalid Date"){
      res.json({error: "Invalid Date" })
    }

    else{
    res.json({unix:  unixTime,
             utc :   utcTime 
    })
  }


})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
