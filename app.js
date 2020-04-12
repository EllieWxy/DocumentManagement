const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const config = require('./config');
const common = require('./router/common')
const JSONError = require('./utils/JSONError')

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

app.use(common.routes())

app.listen(config.PORT);
console.log('DM start');
