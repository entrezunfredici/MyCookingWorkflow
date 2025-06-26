const express = require("express");
const todo = require("../controllers/Todo.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /todos/all:
 *   get:
 *     summary: Récupère toutes les tâches
 *     tags: [todos]
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
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "etape 1"
 *                   description:
 *                     type: string
 *                     example: "Porter à ébullition une casserole d'eau salée"
 *                   datetime:
 *                     type: datetime
 *                     example: "2023-10-01T12:00:00Z"
 *                   todoListId:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", todo.findAll);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Récupère une tâche par son ID
 *     tags: [todos]
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
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "etape 1"
 *                 description:
 *                   type: string
 *                   example: "Porter à ébullition une casserole d'eau salée"
 *                 datetime:
 *                   type: datetime
 *                   example: "2023-10-01T12:00:00Z"
 *                 todoListId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: tâche non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", todo.findOne);

/**
 * @swagger
 * /todos/add:
 *   post:
 *     summary: Ajoute une nouvelle tâche
 *     tags: [todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "etape 1"
 *               description:
 *                 type: string
 *                 example: "Porter à ébullition une casserole d'eau salée"
 *               datetime:
 *                 type: datetime
 *                 example: "2023-10-01T12:00:00Z"
 *               todoListId:
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
router.post("/add", todo.create);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Met à jour une tâche existante
 *     tags: [todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tâche à mettre à jour
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
 *                example: "etape 2"
 *              description:
 *                type: string
 *                example: "faire cuire les spaguetti 12 minutes dans la casserole d'eau bouillante, puis les egoutter et les reserver"
 *              datetime:
 *                type: datetime
 *                example: "2023-10-01T12:00:00Z"
 *              todoListId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: tâche mis à jour avec succès.
 *       404:
 *         description: tâche non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", todo.update);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Supprime une tâche par son ID
 *     tags: [todos]
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
router.delete("/:id", todo.delete);

module.exports = (app) => {
    /**
   * @swagger
   * tags:
   *   - name: todos
   *     description: Gestion des tâches
   */
    app.use("/todos", router);
};
