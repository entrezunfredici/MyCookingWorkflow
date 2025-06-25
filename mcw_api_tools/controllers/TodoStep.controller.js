const TodoStepService = require('../services/TodoStep.service');

exports.findAll = async (req, res) => {
    try {
        const todoSteps = await TodoStepService.findAll();
        res.status(200).json(todoSteps);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todo steps', error });
    }
}

exports.findOne = async (req, res) => {
    const { todoId, stepId } = req.params;
    try {
        const todoStep = await TodoStepService.findOne(todoId, stepId);
        if (!todoStep) {
            return res.status(404).json({ message: 'Todo step not found' });
        }
        res.status(200).json(todoStep);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todo step', error });
    }
};

exports.create = async (req, res) => {
    try {
        const todoStep = await TodoStepService.create(req.body);
        res.status(201).json(todoStep);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo step', error });
    }
}

exports.delete = async (req, res) => {
    const { todoId, stepId } = req.params;
    try {
        const deleted = await TodoStepService.delete(todoId, stepId);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo step not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo step', error });
    }
};
