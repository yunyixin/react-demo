const fs = require('fs');       // 文件模块
const path = require('path');   // 系统路劲模块
const express = require('express');
const serveIndex = require('serve-index');
const favicon = require('serve-favicon');
const _ = require('lodash');
const env = require('../env');

const app = express();
const html = fs.readFileSync(path.resolve(__dirname, 'index.html'));
const {host, port} = env.devServer;

app.use('/', serveIndex('src', {
  'icons': true,
  'template': (locals, callback) => {
    callback(null, _.template(html)({
      scripts: [
        `http://${host}:${port + 1}/vendor.js`,
        `http://${host}:${port + 1}/app.js`
      ].map((script) => `<script src="${script}"></script>`)
        .join('\n')
    }));
  }
}));

// express middleware
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.jpg')));

app.listen(port, host, function listen(err) {
  if (err) {
    console.error(err);
  }
  console.info('==>  Server listening on http://%s:%s', host, port);
});
