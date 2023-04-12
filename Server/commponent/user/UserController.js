const UserService = require('./Userservice');
const mailer = require('nodemailer')
const login = async (email, password) => {
    try {
        return await UserService.login(email, password);

    } catch (error) {
        return false;
    }
}
const register = async (email, password, name) => {
    try {
        return await UserService.register(email, password, name);

    } catch (error) {
        return false;
    }
}
const deleteUserByEmail = async (email) => {
    try {
        return await UserService.deleteUserByEmail(email);

    } catch (error) {
        return false;
    }
}
const updateUser = async (email, password, name) => {
    try {
        return await UserService.updateUser(email, password, name);

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        return await UserService.getAllUser(page, size);
    } catch (error) {
        console.log("Get list user Got an error: " + error);
        throw error;
    }
}
const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: 'nguyenvanson2622003@gmail.com',
        pass: 'pqxamqydjfohyaok'
    },
    tls: { rejectUnauthorized: false }
})


const sendMail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: "Lucas <nguyenvanson2622003@gmail.com>",
            to,
            subject,
            html
        }
        var messageInfo = await transporter.sendMail(mailOptions);
        console.log("messageInfo", messageInfo)
        return true;
    } catch (error) {
        console.log("Send email error:", error);
    }
    return false;
}
module.exports = {
    login, register, deleteUserByEmail,
    updateUser, getAllUser, sendMail
};