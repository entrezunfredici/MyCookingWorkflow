const express = require("express");
const todoList = require("../controllers/TodoList.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /todolist/all:
 *   get:
 *     summary: Récupère toutes les liste de tâches
 *     tags: [TodoList]
 *     responses:
 *       200:
 *         description: Liste de toutes les liste de tâches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "etape 1"
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", authMiddleware, todoList.findAll);

/**
 * @swagger
 * /todolist/{id}:
 *   get:
 *     summary: Récupère une liste de tâche par son ID
 *     tags: [TodoList]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID des liste de tâches
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: liste de tâche correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "etape 1"
 *       404:
 *         description: liste de tâche non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", authMiddleware, todoList.findOne);

/**
 * @swagger
 * /todolist/add:
 *   post:
 *     summary: Ajoute un nouveau liste de tâche
 *     tags: [TodoList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "repas de la journée"
 *     responses:
 *       201:
 *         description: liste de tâche créé avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/add", authMiddleware, todoList.create);

/**
 * @swagger
 * /todolist/{id}:
 *   put:
 *     summary: Met à jour un liste de tâche existant
 *     tags: [TodoList]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du liste de tâche à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *                type: string
 *                example: "plats à preparer"
 *     responses:
 *       200:
 *         description: liste de tâche mis à jour avec succès.
 *       404:
 *         description: liste de tâche non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", authMiddleware, todoList.update);

/**
 * @swagger
 * /todolist/{id}:
 *   delete:
 *     summary: Supprime un liste de tâche par son ID
 *     tags: [TodoList]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du liste de tâche à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: liste de tâche supprimé avec succès.
 *       404:
 *         description: liste de tâche non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", authMiddleware, todoList.delete);

module.exports = (app) => {
    /**
   * @swagger
   * tags:
   *   - name: TodoList
   *     description: Gestion des liste de tâches
   */
    app.use("/todolist", router);
};
