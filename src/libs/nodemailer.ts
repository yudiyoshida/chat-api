import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import mailOptions from '@config/nodemailer';

class Mail {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailOptions);
    this.setEmailTemplate();
  }

  private setEmailTemplate() {
    const viewPath = path.resolve(__dirname, '..', '..', 'resources', 'templates', 'email');
    const options = {
      viewEngine: {
        extname: '.hbs',
        defaultLayout: 'default',
        layoutsDir: path.resolve(viewPath, 'layouts'),
        partialsDir: path.resolve(viewPath, 'partials'),
      },
      viewPath,
      extName: '.hbs',
    };

    this.transporter.use('compile', hbs(options));
  }

  public async sendEmail(to: string, subject: string, template: string, context: any) {
    try {
      const options = {
        from: process.env.SMTP_FROM as string,
        to,
        subject,
        template,
        context,
      };
      this.transporter.sendMail(options);

    } catch (err: any) {
      return err;

    }
  }
}

export default new Mail();
