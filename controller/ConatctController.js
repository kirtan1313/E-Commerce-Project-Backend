const constactSchema = require('../models/contactForm.js')
const nodemailer = require('nodemailer')


const GetContactController = async (req, res) => {
    try {
        const ContactData = await constactSchema.find()
        res.status(200).json({ message: "Contact Get Succes...", ContactData })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const PostContactController = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'mkirtan013@gmail.com', // Your Gmail address
                pass: "soho kofq ahng tiod", // Your Gmail app password
            },
            tls: {
                rejectUnauthorized: false, // Ignore self-signed certificate issues
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "mkirtan013@gmail.com", // Replace with your email
            subject: "New Contact Form Message",
            text: `You have received a new message from ${name}.\n\nMessage:\n${message}\n\nContact Email: ${email}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email.", error });
    }

};





module.exports = { GetContactController, PostContactController }