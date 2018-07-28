import app from "./app";
import * as https from 'https';
import * as fs from 'fs';

const PORT = 3000;

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};

// -- HTTPS -- //
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express secure server listening on port ' + PORT);
})

// -- HTTP -- //
// app.listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// })