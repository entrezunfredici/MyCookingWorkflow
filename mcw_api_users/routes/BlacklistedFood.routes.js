const express = require("express");
const blacklisted_food = require("../controllers/BlacklistedFood.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /BlacklistedFood/all:
 *   get:
 *     summary: Récupère tous les rôles
 *     tags:
 *       - BlacklistedFood
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
router.get("/all", blacklisted_food.findAll);

/**
 * @swagger
 * /BlacklistedFood/{id}:
 *   get:
 *     summary: Récupère un rôle par son ID
 *     tags:
 *       - BlacklistedFood
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
router.get("/:id", blacklisted_food.findOne);

/**
 * @swagger
 * /BlacklistedFood/add:
 *   post:
 *     summary: Ajoute un nouveau rôle
 *     tags:
 *       - BlacklistedFood
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
router.post("/add", blacklisted_food.create);

/**
 * @swagger
 * /BlacklistedFood/{id}:
 *   put:
 *     summary: Met à jour un rôle existant
 *     tags: [BlacklistedFood]
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
 *                 example: "Updated blacklisted_food Name"
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès.
 *       404:
 *         description: Rôle non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", blacklisted_food.update);

/**
 * @swagger
 * /BlacklistedFood/{id}:
 *   delete:
 *     summary: Supprime un rôle par son ID
 *     tags: [BlacklistedFood]
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
router.delete("/:id", blacklisted_food.delete);

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   - name: BlacklistedFood
   *     description: Gestion des rôles
   */
    app.use("/BlacklistedFood", authMiddleware, router);
};