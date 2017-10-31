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

app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.set('json spaces', 2);


const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// const authCheckMiddleware = require('./middleware/auth-check');
// app.use('/api', authCheckMiddleware);

const apiRoutes = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

apiRoutes.use('/users', user);  
apiRoutes.use('/couples', couple);
apiRoutes.use('/goals', goal);
apiRoutes.use('/couplegoals', coupleGoal);

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(config.PORT, config.HOST, function() {
  console.log(`Server started on http://${config.HOST}:${config.PORT}`)
});