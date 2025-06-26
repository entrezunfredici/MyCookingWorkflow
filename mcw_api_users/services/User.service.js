const { Users, Roles } = require("../models/index");
const bcrypt = require('bcryptjs');
const generateCode = require('../helpers/generateCode')

class UserService {

    async findAll() {
        const userList = await Users.findAll();
        return userList.map(user => {
            const { password, ...usersWithoutPassword } = user?.dataValues || user;
            return usersWithoutPassword;
        });
    }

    //this function doesn't work
    async findByEmail(email) {
        console.log("mail")
        const user = await Users.findOne({
            where: { email },
        });
        console.log("mail", user)
        if (!user) return null;
        const { password, ...userWithoutPassword } = user?.dataValues || user;
        return userWithoutPassword;
    }

    async findOne(userId) {
        const user = await Users.findByPk(userId);
        if (!user) return null;
        // eslint-disable-next-line no-unused-vars
        const { password, ...UsersWithoutPassword } = user?.dataValues || user;
        return UsersWithoutPassword;
    }

    async create(user) {
        if (await this.findByEmail(user.email)) throw new Error('Email déjà utilisé');
        if (!user.name || !user.password || !user.email) throw new Error('Champs manquants');

        user.password = await bcrypt.hash(user.password, 10);

        const newUser = await Users.create(user);
        if (!newUser) throw new Error('Erreur lors de la création de l\'utilisateur');

        // eslint-disable-next-line no-unused-vars
        const { password, ...UsersWithoutPassword } = newUser?.dataValues || newUser;
        return UsersWithoutPassword;
    }


    async update(userId, updateUser) {
        await Users.update(updateUser, {
            where: { userId: userId }
        });
        return this.findOne(userId);
    }

    async delete(userId) {
        await Users.destroy({
            where: { userId: userId }
        });
    }

    async setRoles(userId, RolesId) {
        if (!await Roles.findByPk(RolesId)) throw new Error('Le rôle n\'existe pas');

        await Users.update({ RolesId: RolesId }, {
            where: { userId: userId }
        });
        return this.findOne(userId);
    }

    async deleteRoles(userId) {
        await Users.update({ RolesId: null }, {
            where: { userId: userId }
        });
        return this.findOne(userId);
    }

    async updateLoginDate(userId) {
        await Users.update({ lastLogin: new Date() }, {
            where: { userId: userId }
        });
    }

    async verifyPassword(userId, password) {
        const user = await Users.findByPk(userId);
        return await bcrypt.compare(password, user.password);
    }

    async setPassword(userId, password) {
        if (!password) throw new Error('Mot de passe manquant');
        if (password.length < 10) throw new Error('Le mot de passe doit contenir au moins 10 caractères');

        const hashedPassword = await bcrypt.hash(password, 10);
        if (bcrypt.compare(password, hashedPassword)) throw new Error('Le mot de passe doit être différent de l\'ancien');

        await Users.update({ password: hashedPassword }, {
            where: { userId: userId }
        });
    }

    async setValidEmailCode(userId, code = '') {
        if (!code) code = generateCode();
        await Users.update({ validEmailCode: code }, {
            where: { userId: userId }
        });
    }

    async verifyValidEmailCode(userId, code) {
        const user = await Users.findByPk(userId);
        const isValid = user.validEmailCode === code;
        user.validEmailCode = null;
        await user.save();
        return isValid;
    }

    async clearValidEmailCode(userId) {
        await Users.update({ validEmailCode: null }, {
            where: { userId: userId }
        });
    }

    async setResetPasswordCode(userId, code = '') {
        if (!code) code = generateCode();
        await Users.update({ resetPasswordCode: code }, {
            where: { userId: userId }
        });
    }

    async verifyResetPasswordCode(userId, code) {
        const user = await Users.findByPk(userId);
        const isValid = user.resetPasswordCode === code;
        user.resetPasswordCode = null;
        await user.save();
        return isValid;
    }

    async clearResetPasswordCode(userId) {
        await Users.update({ resetPasswordCode: null }, {
            where: { userId: userId }
        });
    }

    async clearAllCodes(userId) {
        await this.clearValidEmailCode(userId);
        await this.clearResetPasswordCode(userId);
    }
}

module.exports = new UserService();
