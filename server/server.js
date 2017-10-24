const express = require('express');
const app = express();
const config = require('./config/config')
const bodyParser = require('body-parser');

const user = require('./controllers/user');
const couple = require('./controllers/couple');
const goal = require('./controllers/goal');
const coupleGoal = require('./controllers/couplegoal');

const authRoutes = require('./controllers/auth')

const passport = require('passport');

app.use(express.static('./client/public'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.set('json spaces', 2);

app.use(passport.initialize());

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// const authCheckMiddleware = require('./middleware/auth-check');
// app.use('/api', authCheckMiddleware);

const apiRoutes = express.Router();

apiRoutes.use('/users', user);  
apiRoutes.use('/couples', couple);
apiRoutes.use('/goals', goal);
apiRoutes.use('/couplegoals', coupleGoal);

app.use('/api/v1', apiRoutes);
app.use('/auth', authRoutes);

app.listen(config.PORT, config.HOST, function() {
  console.log(`Server started on http://${config.HOST}:${config.PORT}`)
});