const userService = require('../services/User.service');
const roleService = require('../services/Role.service');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await userService.create({ name, email, password });

    // Création automatique de la TodoList pour l'utilisateur
    try {
      // Générer un JWT pour le nouvel utilisateur
      const todoListToken = jwt.sign(
        { id: user.userId, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      await axios.post(
        process.env.TOOLS_API_URL + '/todolist/add',
        { name: `${name}_repas`, userId: user.userId },
        {
          headers: {
            Authorization: `Bearer ${todoListToken}`,
          },
        }
      );
    } catch (err) {
      console.error('Erreur lors de la création de la TodoList:', err?.message || err);
      // Optionnel : tu peux choisir de ne pas bloquer l'inscription si la TodoList échoue
    }

    res.status(201).send({ message: "Utilisateur inscrit avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    if (error?.message && error.message.includes('Email déjà utilisé')) {
      return res.status(409).send({ message: error.message });
    }
    if (error?.message && error.message.includes('Champs manquants')) {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({ message: "inscription failed "+(error?.message || error) });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });

    const isPasswordValid = await userService.verifyPassword(user.userId, password);
    if (!isPasswordValid) return res.status(401).send({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { id: user.userId, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.AUTH_JWT_EXPIRES_IN }
    );

    await userService.updateLoginDate(user.userId);

    res.status(200).send({ token });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la connexion." });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await userService.findByEmail(email);

    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });
    if (!userService.verifyValidEmailCode(user.userId, code)) return res.status(401).send({ message: "Code invalide." });

    userService.update(user.userId, { hasValidatedEmail: true });

    res.status(201).send({ message: "Email vérifié avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la vérification de l'email." });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.findByEmail(email);
    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });

    await userService.setResetPasswordCode(user.userId);
    // TODO: Send email with code

    res.status(201).send({ message: "Code de réinitialisation envoyé avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de l'envoi du code de réinitialisation." });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const user = await userService.findByEmail(email);
    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });

    if (!userService.verifyResetPasswordCode(user.userId, code)) return res.status(401).send({ message: "Code invalide." });

    await userService.setPassword(user.userId, newPassword);

    res.status(201).send({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la réinitialisation du mot de passe." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await userService.findOne(req.params.id);
    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });

    user.role = await roleService.findOne(user.roleId);

    res.status(200).send(user);
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur serveur." });
  }
};

exports.update = async (req, res) => {
  try {
    await userService.update(req.params.id, req.body);
    const updatedUser = await userService.findOne(req.params.id);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};

exports.changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    const user = await userService.findOne(id);
    if (!user) return res.status(404).send({ message: "Utilisateur introuvable." });

    const isPasswordValid = await userService.verifyPassword(user.userId, oldPassword);
    if (!isPasswordValid) return res.status(401).send({ message: "Mot de passe incorrect." });

    await userService.setPassword(user.userId, newPassword);

    res.status(200).send({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la modification du mot de passe." });
  }
};

exports.addRole = async (req, res) => {
  const { roleId } = req.body;
  try {
    await userService.setRole(req.params.id, roleId);
    res.status(200).send({ message: "Rôle ajouté avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de l'ajout du rôle." });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    await userService.setRole(req.params.id, roleId);
    res.status(200).send({ message: "Rôle mis à jour avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la mise à jour du rôle." });
  }
};

exports.removeRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    await userService.deleteRole(req.params.id, roleId);
    res.status(200).send({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la suppression du rôle." });
  }
};

exports.delete = async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.status(200).send({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).send({ message: "Erreur lors de la suppression de l'utilisateur." });
  }
};