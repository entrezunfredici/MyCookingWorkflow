const express = require("express");
const diet = require("../controllers/Diet.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /diets/all:
 *   get:
 *     summary: Récupère tous les rôles
 *     tags:
 *       - diets
 *     responses:
 *       200:
 *         description: Liste de tous les rôles
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
 *                     example: "Math"
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", diet.findAll);

/**
 * @swagger
 * /diets/{id}:
 *   get:
 *     summary: Récupère un rôle par son ID
 *     tags:
 *       - diets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du rôle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rôle correspondant à l'ID
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
 *                   example: "Math"
 *       404:
 *         description: Rôle non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", diet.findOne);

/**
 * @swagger
 * /diets/add:
 *   post:
 *     summary: Ajoute un nouveau rôle
 *     tags:
 *       - diets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Student"
 *     responses:
 *       201:
 *         description: Rôle créé avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/add", diet.create);

/**
 * @swagger
 * /diets/{id}:
 *   put:
 *     summary: Met à jour un rôle existant
 *     tags: [diets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du rôle à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated diet Name"
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès.
 *       404:
 *         description: Rôle non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", diet.update);

/**
 * @swagger
 * /diets/{id}:
 *   delete:
 *     summary: Supprime un rôle par son ID
 *     tags: [diets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du rôle à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rôle supprimé avec succès.
 *       404:
 *         description: Rôle non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", diet.delete);

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   - name: diets
   *     description: Gestion des rôles
   */
    app.use("/diets", router);
  // app.use("/diets", authMiddleware, router);
};