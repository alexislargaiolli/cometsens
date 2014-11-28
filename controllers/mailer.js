//var postmark = require("postmark")('71f80713-5c15-4240-8ea8-bf0dbaa6230b')
var postmark = require("postmark")(process.env.POSTMARK_API_KEY);

exports.sendMail = function(from, fistName, lastName, content, callback){
    var mailOptions = {
        "From": "contact@cometsens.com",
        "To": "alexis.largaiolli@gmail.com",
        "Subject": "Contact com&sens",
        "TextBody": "test",
        "Tag": "cometsenes"
    };
    console.log(mailOptions);

    postmark.send(mailOptions, function(error, success) {
        if(error) {
            var msg = "Unable to send via postmark: " + error.message;
            console.error(msg);
            callback('error', msg);
            return;
        }
        var msg = "Sent to postmark for delivery";
        console.info(msg);
        callback('success', msg);
    });
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