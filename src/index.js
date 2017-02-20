

import express  from 'express';
// connect to db
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

let app=express();
app.server=http.createServer(app);


//middleware
app.use(bodyParser.json({limit:config.bodylimit}));

//passport
app.use(passport.initialize());
let  Account= require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField:  'password'
},
Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use('/v1',routes);

app.server.listen(config.port);
console.log(`started on port ${app.server.address().port}`);
export default app;
