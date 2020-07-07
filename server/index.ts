import Koa from 'koa';
import server from 'koa-static';

const app = new Koa();

app.use(server('./public'));
const PORT = process.env.PORT || 8080;
// Serve the files on port 3001.
app.listen(PORT, function () {
  console.log(`Example app listening on ${PORT} !\n`);
});
