const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const mongoose = require("mongoose");
const mongooseStore = require('koa-session-mongoose');
const session = require('koa-session');
const logger = require('koa-logger')
const path = require('path');

const middleware = require('./utils/middleware');
const config = require('./config');
const JSONError = require('./utils/JSONError');
const common = require('./router/common');
const file = require('./router/file');
const user = require('./router/user');
const mongoUrl = require('./models').mongoUrl

mongoose.connect(mongoUrl);

const app = new Koa();
app.use(async function(ctx,next) {
  try {
   await next()
  } catch (err) {
    if(err instanceof JSONError) {
      ctx.response.body = err.message;
      ctx.response.status = err.status;
    } else {
      ctx.response.status = 500;
      ctx.response.body = err.message
    }
  }
})
app.keys = config.keys

app.use(logger())
app.use(bodyParser());
app.use(static(path.join(__dirname)))
app.use(session({store :new mongooseStore()},app))

app.use(common.routes())
app.use(middleware.checkLogin)
app.use(user.routes())
app.use(file.routes())

app.listen(config.PORT);
if(config.nodeEnv === 'dev'){
  console.log('DM start');
}
