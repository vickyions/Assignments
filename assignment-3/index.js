const fs = require('fs');
const http = require('http');
const path = require('path');

const createFile = function () {
    const content = '<h1>Hello World</h1>' + '<p>This is Vicky Soni</p>';
    return new Promise((res, rej) => {
        fs.writeFile(
            path.join(__dirname, 'index.html'),
            content,
            { encoding: 'utf-8' },
            (err) => {
                if (err) rej(err);
                console.log(
                    'created the files needed for running this app...starting server...'
                );
                res();
            }
        );
    });
};

createFile()
    .then(() => {
        const server = http.createServer((req, res) => {
            fs.readFile(
                path.join(__dirname, 'index.html'),
                { encoding: 'utf-8' },
                (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            );
        });

        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server has started on port: ${PORT}`);
        });
    })
    .catch((err) =>
        console.log('wasnt able to create files needed for running this app::', err)
    );
