const dietService = require("../services/Diet.service.js");

exports.findAll = async (req, res) => {
    try {
        const data = await dietService.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des rôles.",
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const data = await dietService.findOne(req.params.id);
        if (!data) {
            res.status(404).send({
                message: `Rôle introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || `Erreur lors de la récupération du rôle avec l'identifiant ${req.params.id}.`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await dietService.create({ name });
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création du rôle.",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedDiet = await dietService.update(req.params.id, req.body);
        if (!updatedDiet) {
            res.status(404).send({
                message: `Rôle introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(updatedDiet);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la mise à jour du rôle.",
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await dietService.delete(req.params.id);
        if (!deleted) {
            res.status(404).send({
                message: `Rôle introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la suppression du rôle.",
        });
    }
}