const { log } = require('console');
var http = require('http');

const httpServer = http.createServer(handleServer);

function handleServer(req, res) {
    if (req.url === '/') {
        res.writeHead(302, {
            'Content-Type': 'text/html',
            location: '/welcome',
        });
        res.write('<h1>Dominos</h1>');
        res.end();
        return;
    }

    if (req.url === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Welcome to Dominos!');
        res.end();
        return;
    }

    if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(
            JSON.stringify({
                phone: '18602100000',
                email: 'guestcaredominos@jublfood.com',
            })
        );
        res.end();
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404: Page Not Found');
    res.end();
    return;
}

const PORT = 8081;
httpServer.listen(PORT, () => console.log('Server started at 8081 port!'));

module.exports = httpServer;
