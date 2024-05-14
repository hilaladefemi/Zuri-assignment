

const http = require('http');
const db = [
  { title: 'Joke 1', comedian: 'Comedian 1', year: 2020, id: 1 },
  { title: 'Joke 2', comedian: 'Comedian 2', year: 2021, id: 2 }
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/' && method === 'POST') {
    let joke = '';
    req.on('data', (chunk) => {
      joke += chunk;
    });
    req.on('end', () => {
      joke = JSON.parse(joke);
      db.push(joke);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db));
    });
  } else if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
  } else if (url.startsWith('/joke/') && method === 'PATCH') {
    const id = parseInt(url.slice(6));
    const joke = db.find((joke) => (updates) === id);
    if (joke) {
      let updates = '';
      req.on('data', (chunk) => {
        updates += chunk;
      });
      req.on('end', () => {
        updates = JSON.parse(updates);
        Object.assign(joke, updates);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(joke));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Joke not found' }));
    }
  } else if (url.startsWith('/joke/') && method === 'DELETE') {
    const id = parseInt(url.slice(6));
    const joke = db.find((joke) => (updates) === id);
    if (joke) {
      db.splice(db.indexOf(joke), 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(joke));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Joke not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
}).listen(3000, () => {
  console.log('Server listening on port 3000');
});


