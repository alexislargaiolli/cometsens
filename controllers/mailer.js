//var postmark = require("postmark")('71f80713-5c15-4240-8ea8-bf0dbaa6230b')
//var postmark = require("postmark")(process.env.POSTMARK_API_KEY);

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);


exports.sendMail = function(from, firstName, lastName, content, callback){
    var c = 'Message de ' + firstName + ' ' + lastName + '\n' + content;
    sendgrid.send({
      to:       'alexis.largaiolli@gmail.com',
      from:     from,
      subject:  'Message Com & Sens',
      text:     c
    }, function(error, json) {
      if(error) {
            var msg = "Unable to send via postmark: " + error.message;
            console.error(msg);
            callback('error', "Une erreur est survenue pendant l'envoi du message...");
            return;
        }
        var msg = "Votre message a bien été envoyé !";
        callback('success', msg);
    });

    /*postmark.send(mailOptions, function(error, success) {
        if(error) {
            var msg = "Unable to send via postmark: " + error.message;
            console.error(msg);
            callback('error', msg);
            return;
        }
        var msg = "Sent to postmark for delivery";
        console.info(msg);
        callback('success', msg);
    });*/
};



/*var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alexis.largaiolli@gmail.com',
        pass: 'dou.DOUgm21'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object
exports.sendMail = function(from, fistName, lastName, content){
    var mailOptions = {
        from: from, // sender address
        to: 'alexis.largaiolli@gmail.com', // list of receivers
        subject: 'Contact de ' +fistName + " " + lastName , // Subject line
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });  
};*/