const sendgrid = require('@sendgrid/mail');
const api = '';  
sendgrid.setApiKey(api);

async function sendEmail(){
    const msg = {
            to:'',
            from:'',
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
