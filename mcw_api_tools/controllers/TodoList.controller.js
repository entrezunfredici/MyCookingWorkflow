const ToDoListService = require('../services/ToDoList.service.js');

exports.findAll = async (req, res) => {
    try {
        const data = await ToDoListService.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des listes de tâches.",
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const data = await ToDoListService.findOne(req.params.id);
        if (!data) {
            res.status(404).send({
                message: `Liste de tâches introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || `Erreur lors de la récupération de la liste de tâches avec l'identifiant ${req.params.id}.`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await ToDoListService.create(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la liste de tâches.",
        });
    }
}

exports.update = async (req, res) => {
    try {
        const updatedList = await ToDoListService.update(req.params.id, req.body);
        if (!updatedList) {
            res.status(404).send({
                message: `Liste de tâches introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send(updatedList);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la mise à jour de la liste de tâches.",
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const deletedList = await ToDoListService.delete(req.params.id);
        if (!deletedList) {
            res.status(404).send({
                message: `Liste de tâches introuvable pour l'identifiant ${req.params.id}.`,
            });
        } else {
            res.status(200).send({ message: "Liste de tâches supprimée avec succès." });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la suppression de la liste de tâches.",
        });
    }
}
