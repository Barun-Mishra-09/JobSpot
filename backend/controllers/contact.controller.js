import { Contact } from "../models/contact.model.js";
import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

 console.log("CONTACT BODY =>", req.body);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ADMIN_PASS defined:", !!process.env.ADMIN_PASS);
    
    // validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // save messages in DB
    const savedMessage = await Contact.create({ name, email, message });

    // Nodemailer email to me(Admin)
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use TLS
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS, // Gmail App Password (NOT normal Gmail password)
  },
});




    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL, // gmail requires you  email
      to: process.env.ADMIN_EMAIL, // you receive message
      replyTo: email, // Now reply goes to user
      subject: `New  Message from ${name} (${email})`,
      text: `Name: ${name} Email: ${email} Message: ${message}`,
      html: `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>,
    `,
    });

    return res.status(201).json({
      message: "Your message has been sent successfully",
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    console.log("Contact form error:", error);

    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
      error: error.message,
    });
  }
};
