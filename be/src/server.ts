import App from './app';
import Router from './router';

const app = new App([...Router]);

setImmediate(() => {
  app.listen();
});