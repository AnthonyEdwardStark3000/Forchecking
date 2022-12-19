const sendgrid = require('@sendgrid/mail');
const api = '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';  
sendgrid.setApiKey(api);

async function sendEmail(){
    const msg = {
            to:'bovolo3866@paxven.com',
            from:'developmentapplication01@gmail.com',
            subject:'Check mail',
            html:'<h1>Hi bro'
        };
        try {
         await sendgrid.send(msg);   
            console.log('Done');
        } catch (error) {
            console.log(error);
        }
}

sendEmail();