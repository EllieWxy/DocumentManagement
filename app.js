const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const mongoose = require("mongoose");
const mongooseStore = require('koa-session-mongoose');
const session = require('koa-session');
const path = require('path');
const middleware = require('./utils/middleware');
const config = require('./config');
const JSONError = require('./utils/JSONError');
const common = require('./router/common');
const mongoUrl = require('./models/club').mongoUrl

mongoose.connect(mongoUrl);

const app = new Koa();
app.use(async function(ctx,next) {
  try {
   await next()
  } catch (err) {
    console.log(err);
    if(err instanceof JSONError) {
      ctx.response.body = err.message;
      ctx.response.status = err.status;
    } else {
      ctx.response.status = 500;
    }
  }
})
app.keys = config.keys

app.use(bodyParser());
app.use(static(path.join(__dirname)))
app.use(session({store :new mongooseStore()},app))

app.use(common.routes())
app.use(middleware.checkLogin)

app.listen(config.PORT);
console.log('DM start');
