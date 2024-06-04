
import nodemailer from 'nodemailer';
// 2. Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
            user:'shubham.kb888@gmail.com',
            pass: 'oehw wveu evqz rrry',
  },
});

// 3. Function to send an email
export async function sendMail(userId, otp) {
  // 2. Configure email content 
  const mailOption = {
    from: 'shubham.kb888@gmail.com',
    to: userId,
    subject: "Security Code for Changing Your Password",
    text: `Dear User,

    Your request to change the password has been received. 
    To proceed, please use the following security code:

    Security Code: ${otp}

    This security code is valid for a limited time and can only be used once. 
    If you did not initiate this request, please disregard this email.

    Regards,
    [Coders] Team`,
  };

  // 3. Send the email.
  try {
    await transporter.sendMail(mailOption);
    const result = 'Email sent successfully'
    return result
  } catch (err) {
    console.log('Email send failed with error: ' + err);
  }
}