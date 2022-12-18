const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transport = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: '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',
    }
}));
transport.sendMail({
  to: 'catchmesureshbabu8@gmail.com',
  from:'sureshbabuj09@gmail.com',
  subject:'Sign-Up succeeded',
  html:'<h1>Your account has been Successfully created</h1>'
},err=>{
    console.log('error',err);
}
);