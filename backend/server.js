// Script de lancement du serveur avec gestions d'erreurs, du port utilisé et d'une notification de lancement

const http = require("http");
const app  = require("./app");

// Fonction de gestion de l'attribution de la valeur d'un port utilisable pour le serveur
const NormalizePort = val =>
{
    const port = parseInt(val, 10);

    if (isNaN(port))    return val;
    if (port >= 0)      return port;

    return false;
};

const port = NormalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction de gestion d'une erreur de lancement du serveur, analysant l'adresse et le port de celui-ci
const ErrorHandler = error =>
{
    if (error.syscall !== 'listen')   throw error;

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code)
    {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:    throw error;
    }
};

const server = http.createServer(app);

server.on('error', ErrorHandler);

// Si le lancement du serveur n'occassionne pas d'erreur alors on affiche un message donnant la valeur du port utilisé
server.on('listening', () =>
{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Serveur lancé au ' + bind);
});

server.listen(port);