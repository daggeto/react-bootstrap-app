import Koa from 'koa';
import server from 'koa-static';

const app = new Koa();

app.use(server('./public'));

// Serve the files on port 3001.
app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});
