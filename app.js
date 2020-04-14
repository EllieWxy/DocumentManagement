const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const config = require('./config');
const JSONError = require('./utils/JSONError');
const common = require('./router/common');

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
app.use(bodyParser());
app.use(static(path.join(__dirname)))

app.use(common.routes())

app.listen(config.PORT);
console.log('DM start');
