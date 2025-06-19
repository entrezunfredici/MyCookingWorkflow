const express = require("express");
const blacklisted_food = require("../controllers/BlacklistedFood.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /BlacklistedFood/all:
 *   get:
 *     summary: Récupère tous les ingrédient dépréciés
 *     tags:
 *       - BlacklistedFood
 *     responses:
 *       200:
 *         description: Liste de tous les ingrédient dépréciés
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
 *                     example: "Oignon"
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", blacklisted_food.findAll);

/**
 * @swagger
 * /BlacklistedFood/{id}:
 *   get:
 *     summary: Récupère un ingrédient déprécié par son ID
 *     tags:
 *       - BlacklistedFood
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du ingrédient déprécié
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ingrédient déprécié correspondant à l'ID
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
 *                   example: "Oignon"
 *       404:
 *         description: ingrédient déprécié non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", blacklisted_food.findOne);

/**
 * @swagger
 * /BlacklistedFood/add:
 *   post:
 *     summary: Ajoute un nouveau ingrédient déprécié
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
 *                 example: "Oignon"
 *     responses:
 *       201:
 *         description: ingrédient déprécié créé avec succès
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
 *     summary: Met à jour un ingrédient déprécié existant
 *     tags: [BlacklistedFood]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du ingrédient déprécié à mettre à jour
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
 *         description: ingrédient déprécié mis à jour avec succès.
 *       404:
 *         description: ingrédient déprécié non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", blacklisted_food.update);

/**
 * @swagger
 * /BlacklistedFood/{id}:
 *   delete:
 *     summary: Supprime un ingrédient déprécié par son ID
 *     tags: [BlacklistedFood]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du ingrédient déprécié à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ingrédient déprécié supprimé avec succès.
 *       404:
 *         description: ingrédient déprécié non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", blacklisted_food.delete);

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   - name: BlacklistedFood
   *     description: Gestion des ingrédient dépréciés
   */
    app.use("/BlacklistedFood", authMiddleware, router);
};