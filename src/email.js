import nodemailer from "nodemailer";
const enviarMail = async (email) => {
  const config = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "miguel.callizaya@gmail.com",
      pass: "sdpx tfrj ttsd arhg",
    },
  };

  // async..await is not allowed in global scope, must use a wrapper
  const mensaje = {
    // send mail with defined transport object
    from: "miguel.callizaya@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Se añadio un nuevo proyecto", // Subject line
    text: "Se acaba de añadir un nuevo proyecto de investigacion, puede interesarte", // plain text body
    html: "<h1>¡Se añadio un nuevo Proyecto!</h1>"+
          "<p>Puede ser intersante, ¡ve a verlo!</p>"+
          "<br/><p><a href='https://proyectos-unsxx.site/filepage'>Clic para ir a verlo ahora!!</a></p>", // html body
  };

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje)

  console.log("Message sent: ", info.messageId);
};

export default enviarMail;