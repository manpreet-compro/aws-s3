"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');
const routes = require('./routes');
const awsHelper = require('./helpers/aws');

const app = express();
const port = process.env.PORT || config.app.port;

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(`/`, routes);

app.listen(port,()=>{
    console.log(`Node Server listening on port ${port}`);
})
module.exports = app;

