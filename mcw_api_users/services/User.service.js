const { Users, Roles } = require("../models/index");
const bcrypt = require('bcryptjs');
const generateCode = require('../helpers/generateCode')

class UserService {

    async findAll() {
        const Users = await Users.findAll();
        return Users.map(Users => {
            // eslint-disable-next-line no-unused-vars
            const { password, ...UsersWithoutPassword } = Users?.dataValues || Users;
            return UsersWithoutPassword;
        });
    }

    //this function doesn't work
    async findByEmail(email) {
        console.log("mail")
        const Users = await Users.findOne({
            where: { email },
        });
        console.log("mail", Users)
        if (!Users) return null;
        const { password, ...UsersWithoutPassword } = Users?.dataValues || Users;
        return UsersWithoutPassword;
    }

    async findOne(UsersId) {
        const Users = await Users.findByPk(UsersId);
        if (!Users) return null;
        // eslint-disable-next-line no-unused-vars
        const { password, ...UsersWithoutPassword } = Users?.dataValues || Users;
        return UsersWithoutPassword;
    }

    async create(newUser) {
        //if (await this.findByEmail(newUser.email)) throw new Error('Email déjà utilisé');
        if (!newUser.name || !newUser.password || !newUser.email) throw new Error('Champs manquants');

        newUser.password = await bcrypt.hash(newUser.password, 10);

        const newUsers = await Users.create(newUser);
        if (!newUsers) throw new Error('Erreur lors de la création de l\'utilisateur');

        // eslint-disable-next-line no-unused-vars
        const { password, ...UsersWithoutPassword } = newUsers?.dataValues || newUsers;
        return UsersWithoutPassword;
    }


    async update(UsersId, updateUser) {
        await Users.update(updateUser, {
            where: { UsersId: UsersId }
        });
        return this.findOne(UsersId);
    }

    async delete(UsersId) {
        await Users.destroy({
            where: { UsersId: UsersId }
        });
    }

    async setRoles(UsersId, RolesId) {
        if (!await Roles.findByPk(RolesId)) throw new Error('Le rôle n\'existe pas');

        await Users.update({ RolesId: RolesId }, {
            where: { UsersId: UsersId }
        });
        return this.findOne(UsersId);
    }

    async deleteRoles(UsersId) {
        await Users.update({ RolesId: null }, {
            where: { UsersId: UsersId }
        });
        return this.findOne(UsersId);
    }

    async updateLoginDate(UsersId) {
        await Users.update({ lastLogin: new Date() }, {
            where: { UsersId: UsersId }
        });
    }

    async verifyPassword(UsersId, password) {
        const Users = await Users.findByPk(UsersId);
        return await bcrypt.compare(password, Users.password);
    }

    async setPassword(UsersId, password) {
        if (!password) throw new Error('Mot de passe manquant');
        if (password.length < 10) throw new Error('Le mot de passe doit contenir au moins 10 caractères');

        const hashedPassword = await bcrypt.hash(password, 10);
        if (bcrypt.compare(password, hashedPassword)) throw new Error('Le mot de passe doit être différent de l\'ancien');

        await Users.update({ password: hashedPassword }, {
            where: { UsersId: UsersId }
        });
    }

    async setValidEmailCode(UsersId, code = '') {
        if (!code) code = generateCode();
        await Users.update({ validEmailCode: code }, {
            where: { UsersId: UsersId }
        });
    }

    async verifyValidEmailCode(UsersId, code) {
        const Users = await Users.findByPk(UsersId);
        const isValid = Users.validEmailCode === code;
        Users.validEmailCode = null;
        await Users.save();
        return isValid;
    }

    async clearValidEmailCode(UsersId) {
        await Users.update({ validEmailCode: null }, {
            where: { UsersId: UsersId }
        });
    }

    async setResetPasswordCode(UsersId, code = '') {
        if (!code) code = generateCode();
        await Users.update({ resetPasswordCode: code }, {
            where: { UsersId: UsersId }
        });
    }

    async verifyResetPasswordCode(UsersId, code) {
        const Users = await Users.findByPk(UsersId);
        const isValid = Users.resetPasswordCode === code;
        Users.resetPasswordCode = null;
        await Users.save();
        return isValid;
    }

    async clearResetPasswordCode(UsersId) {
        await Users.update({ resetPasswordCode: null }, {
            where: { UsersId: UsersId }
        });
    }

    async clearAllCodes(UsersId) {
        await this.clearValidEmailCode(UsersId);
        await this.clearResetPasswordCode(UsersId);
    }
}

module.exports = new UserService();
