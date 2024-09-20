var express = require('express');
const cors = require("cors");

var app = express();
var corsOptions = {
    origin: "*"
  };
app.use(cors(corsOptions));
const bodyParser = require('body-parser');

const db = require("./src/models");
db.sequelize.sync();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('assets'));

require('./src/routes/account/customer/resent-customer-otp.routes')(app);
require('./src/routes/account/customer/create-customer.routes')(app);
require('./src/routes/account/customer/validate-customer.routes')(app);
require('./src/routes/account/customer/signin-customer.routes')(app);
require('./src/routes/account/owner/create-owner.routes')(app);
require('./src/routes/account/owner/validate-owner.routes')(app);
require('./src/routes/account/owner/update-owner-file.routes')(app);
require('./src/routes/account/change-password.routes')(app);
require('./src/routes/account/owner/signin-owner.routes')(app);
require('./src/routes/wallet/get-balance.routes')(app);
require('./src/routes/property/add-property.routes')(app);
require('./src/routes/property/update-property.routes')(app);
require('./src/routes/property/delete-property.routes')(app);
require('./src/routes/property/getall-property.routes')(app);
require('./src/routes/property/get-property-photo.routes')(app);
require('./src/routes/property/getmy-property.routes')(app);
require('./src/routes/property/update-property-file.routes')(app);
require('./src/routes/announcement/add-announcement.routes')(app);
require('./src/routes/announcement/update-announcement.routes')(app);
require('./src/routes/announcement/getall-announcement.routes')(app);
require('./src/routes/announcement/getmy-announcement.routes')(app);
require('./src/routes/announcement/delete-announcement.routes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    });

module.exports = app;