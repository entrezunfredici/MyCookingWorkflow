const TodoListService = require('../services/ToDoList.service.js');

exports.findAll = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await TodoListService.findAll(userId);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des listes de tâches.",
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await TodoListService.findOne(req.params.id, userId);
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
        const userId = req.user.userId;
        const data = await TodoListService.create({ ...req.body, userId });
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la liste de tâches.",
        });
    }
}

exports.update = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updatedList = await TodoListService.update(req.params.id, req.body, userId);
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
        const userId = req.user.userId;
        const deletedList = await TodoListService.delete(req.params.id, userId);
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
