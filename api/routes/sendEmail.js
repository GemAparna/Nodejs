// const sgMail = require('@sendgrid/mail')

// const sgMailApiKey = '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'

// sgMail.setApiKey(sgMailApiKey)



// module.exports.sendEmail = (email, password) => {
    
//   console.log(email +" : "+password)
//     sgMail.send({
//         to: email,
//         from: 'Aparna.Singh@Geminisolutions.com',
//         subject: 'Password Reset',
//         text: `Hello. <br> Welocome to Fix That Device. <br> Your new password is: ${password} `,
//         html: `<p>Hello. <br> Welocome to Fix That Device. <br>Your new password is: <b>${password}</b></p>`

//     }).then(() => {}, error => {
//         console.error(error);
     
//         if (error.response) {
//           console.error(error.response.body)
//         }
//       });

// }


// module.exports.sendTemplate = (to,from, templateId, dynamic_template_data) => {
//   const msg = {
//     to,
//     from: { name: 'Aparna Singh', email: from },
//     templateId,
//     dynamic_template_data
//   };
//   console.log(msg)
//   sgMail.send(msg)
//     .then((response) => {
//       console.log('mail-sent-successfully', {templateId, dynamic_template_data });
//       console.log('response', response);
//       /* assume success */

//     })
//     .catch((error) => {
//       /* log friendly error */
//       console.error('send-grid-error: ', error.toString());
//     });
// };
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'singhaparna2312@gmail.com', // Change to your recipient
//   from: 'Aparna.Singh@Geminisolutions.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })