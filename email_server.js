const express = require('express')
const nodeMailer = require('nodemailer');
const Email = require('email-templates')
const path = require('path')
const Promise = require('bluebird')
const app = express();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const PORT = process.env.PORT || 3002

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var cors = require('cors')

const msg = {
  to: 'stefan.derian@gmail.com',
  from: 'tploek@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


app.use(cors())
app.get('/api/email/test' , (req,res) => {
  console.log('test')
})


//load email template based on email templates v4+
// function loadTemplate (templateName, contexts) {
//     let email = new Email(path.join(__dirname, 'email_template', templateName));
//     return Promise.all(contexts.map((context) => {
//         return new Promise((resolve, reject) => {
//             email.render(context, (err, result) => {
//                 if (err) reject(err);
//                 else resolve({
//                     email: result,
//                     context,
//                 });
//             });
//         });
//     }));
// }
// function for sending the email based on the dynamic transporter
function sendEmail (transporter,obj) {
    return transporter.sendMail(obj);
}

app.post('/api/email/migration',(req,res) => {
      console.log(req.body.migrationData)

      // let mailOptions = {
      //     from: '"'+req.body.displayName+'"'+ '<'+req.body.auth.email+'>', // sender address
      //     to: req.body.to.email, // list of receivers
      //     subject: "Your point test update", // Subject line
      //     text: "Hello", // plain text body
      //     html: '<b>NodeJS Email Tutorial</b>' // html body
      // };

      //send the email with template
      var transporter = nodeMailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                  user: req.body.auth.email,
                  pass: req.body.auth.pass
              }
          });

      const email = new Email({
        message: {
          from: 'stefan.derian@gmail.com'
        },
        // uncomment below to send emails in development/test env:
        send: true,
        transport: transporter
      });


      email
        .send({
          template: 'migration',
          message: {
            to: req.body.to.email
          },
          locals: {
            name: req.body.to.name,
            feedback:req.body.feedback,
            migrationData:req.body.migrationData,
            displayName:req.body.displayName,
            role:req.body.role,
          }
        })
        .then(console.log)
        .catch(console.error);

        // var users = [
        //   {
        //     name: 'Stefan',
        //     email: 'tploek@gmail.com',
        //   }
        // ];
        //
        //
        // loadTemplate('migration', users).then((results) => {
        //     return Promise.all(results.map((result) => {
        //         sendEmail(transporter,{
        //             to: result.context.email,
        //             from: 'Stefan Derian',
        //             subject: result.email.subject,
        //             html: result.email.html,
        //             text: result.email.text,
        //         });
        //     }));
        // }).then(() => {
        //     console.log('Yay!');
        // });
        res.send(200)



  })



app.listen(PORT, () =>{
  console.log(` server listening on PORT ${PORT}`)
})
