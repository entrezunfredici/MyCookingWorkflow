const stepService = require("../services/Step.service.js");

exports.findAll = async (req, res) => {
    try {
        const data = await stepService.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des étapes.",
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const data = await stepService.findOne(req.params.id);
        if (!data) {
            res.status(404).send({
                message: `Etape introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || `Erreur lors de la récupération de l'étape avec l'identifiant ${req.params.id}.`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await stepService.create(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de l'étape.",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedRole = await stepService.update(req.params.id, req.body);
        if (!updatedRole) {
            res.status(404).send({
                message: `Rôle introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(updatedRole);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la mise à jour de l'étape.",
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await stepService.delete(req.params.id);
        if (!deleted) {
            res.status(404).send({
                message: `Etape introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la suppression de l'étape.",
        });
    }
}

exports.setCompleted = async (req, res) => {
    try {
        const stepId = req.params.id;
        const step = await stepService.findOne(stepId);
        if (!step) {
            return res.status(404).send({
                message: `Etape introuvable pour l'identifiant ${stepId}.`,
            });
        }

        // Inverse l'état de la complétion
        const updatedStep = await stepService.update(stepId, { completed: !step.completed });
        res.status(200).send(updatedStep);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la mise à jour de l'état de l'étape.",
        });
    }
}
