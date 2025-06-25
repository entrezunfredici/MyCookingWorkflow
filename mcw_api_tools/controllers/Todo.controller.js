const TodoService = require("../services/ToDo.service.js");

exports.findAll = async (req, res) => {
    try {
        const data = await TodoService.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des tâches.",
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const data = await TodoService.findOne(req.params.id);
        if (!data) {
            res.status(404).send({
                message: `Tâche introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || `Erreur lors de la récupération de la tâche avec l'identifiant ${req.params.id}.`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await TodoService.create(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la tâche.",
        });
    }
}

exports.update = async (req, res) => {
    try {
        const updatedToDo = await TodoService.update(req.params.id, req.body);
        if (!updatedToDo) {
            res.status(404).send({
                message: `Tâche introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(updatedToDo);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la mise à jour de la tâche.",
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const deletedToDo = await TodoService.delete(req.params.id);
        if (!deletedToDo) {
            res.status(404).send({
                message: `Tâche introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send({ message: "Tâche supprimée avec succès." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la suppression de la tâche.",
        });
    }
}
