const express = require("express");
const diet = require("../controllers/Diet.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /diets/all:
 *   get:
 *     summary: Récupère tous les régime alimentaires
 *     tags:
 *       - diets
 *     responses:
 *       200:
 *         description: Liste de tous les régime alimentaires
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
 *                     example: "Végétarien"
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", diet.findAll);

/**
 * @swagger
 * /diets/{id}:
 *   get:
 *     summary: Récupère un régime alimentaire par son ID
 *     tags:
 *       - diets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du régime alimentaire
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: régime alimentaire correspondant à l'ID
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
 *                   example: "Végétarien"
 *       404:
 *         description: régime alimentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", diet.findOne);

/**
 * @swagger
 * /diets/add:
 *   post:
 *     summary: Ajoute un nouveau régime alimentaire
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
 *                 example: "Végétarien"
 *     responses:
 *       201:
 *         description: régime alimentaire créé avec succès
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
 *     summary: Met à jour un régime alimentaire existant
 *     tags: [diets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du régime alimentaire à mettre à jour
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
 *         description: régime alimentaire mis à jour avec succès.
 *       404:
 *         description: régime alimentaire non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", diet.update);

/**
 * @swagger
 * /diets/{id}:
 *   delete:
 *     summary: Supprime un régime alimentaire par son ID
 *     tags: [diets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du régime alimentaire à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: régime alimentaire supprimé avec succès.
 *       404:
 *         description: régime alimentaire non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", diet.delete);

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   - name: diets
   *     description: Gestion des régimes alimentaires
   */
    app.use("/diets", authMiddleware, router);
};