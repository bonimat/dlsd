const { mailer } = require('./controller/mailer');

mailer('Oggetto: sei un salame', 'Salame', 'bonimat@hotmail.com').then(
    (info) => {
        console.log('Message sent: %s', info.messageId);
    }
);
