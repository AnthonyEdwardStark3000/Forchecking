const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transport = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: '',
    }
}));
transport.sendMail({
  to: '',
  from:'',
  subject:'Sign-Up succeeded',
  html:'<h1>Your account has been Successfully created</h1>'
},err=>{
    console.log('error',err);
}
);