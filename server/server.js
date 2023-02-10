require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');

const app = express();

const User = require('./models/user');

// Allow client CORS request
const cors = require('cors');
const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require('./controllers/db');

const sessionMiddleware = expressSession({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 3600000 * 24 * 2,   //2days
        sameSite: "strict",
        // secure: true,   // set only when using https
        httpOnly: true
    }, 
    store: mongoStore.create({ client: mongoose.connection.getClient() })
});
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use('localUser', new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
  user = { _id: user._id, email: user.email, name :user.name};
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (user != null)
    done(null, user);
});

// select version OR add other versions below
app.use(`/api/v1/`, require(`./routes/v1`));

const port = process.env.API_PORT;
app.listen(port || 3001, () => console.log(`API Server Running | Port: ${port}`));