const mongoose = require('mongoose');
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);

mongoose.connect('mongodb://localhost/FIDELEDEMO',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("App connected to DB...");
})
.catch((error)=>{
    console.log("App failed to connect to DB.. error "+error);
})

require('./Users.model');