const express = require("express");
const todoStepStep = require("../controllers/TodoStep.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /todoSteps/all:
 *   get:
 *     summary: Récupère toutes les tâches
 *     tags: [todoSteps]
 *     responses:
 *       200:
 *         description: Liste de toutes les tâches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   todoId:
 *                     type: integer
 *                     example: 1
 *                   stepId:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", authMiddleware, todoStep.findAll);

/**
 * @swagger
 * /todoSteps/{id}:
 *   get:
 *     summary: Récupère une tâche par son ID
 *     tags: [todoSteps]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID des tâches
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: tâche correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todoId:
 *                   type: integer
 *                   example: 1
 *                 stepId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: tâche non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", authMiddleware, todoStep.findOne);

/**
 * @swagger
 * /todoSteps/add:
 *   post:
 *     summary: Ajoute une nouvelle tâche
 *     tags: [todoSteps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: integer
 *                 example: 1
 *               stepId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: tâche créé avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/add", authMiddleware, todoStep.create);

/**
 * @swagger
 * /todoSteps/{id}:
 *   delete:
 *     summary: Supprime une tâche par son ID
 *     tags: [todoSteps]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tâche à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: tâche supprimé avec succès.
 *       404:
 *         description: tâche non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", authMiddleware, todoStep.delete);

module.exports = (app) => {
    /**
   * @swagger
   * tags:
   *   - name: todoSteps
   *     description: Gestion des tâches
   */
    app.use("/todoSteps", router);
};
