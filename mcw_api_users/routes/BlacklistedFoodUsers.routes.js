const express = require("express");
const controller = require("../controllers/BlacklistedFoodUsers.controller");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /blacklistedFoodUsers/add:
 *   post:
 *     summary: Créer une relation entre un utilisateur et un système Leitner
 *     tags: [BlacklistedFoodUsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 example: 1
 *               idDiet:
 *                 type: integer
 *                 example: 1
 *               writeRight:
 *                 type: boolean
 *                 example: true
 *               shareRight:
 *                 type: boolean
 *                 example: false
 *               shareWithWriteRightRight:
 *                 type: boolean
 *                 example: false
 *               shareWithAllRights:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Relation créée avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/add", controller.create);

/**
 * @swagger
 * /blacklistedFoodUsers/all:
 *   get:
 *     summary: Récupérer toutes les relations entre utilisateurs et systèmes Leitner
 *     tags: [BlacklistedFoodUsers]
 *     responses:
 *       200:
 *         description: Liste de toutes les relations récupérées avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/all", controller.findAll);

/**
 * @swagger
 * /blacklistedFoodUsers/{idUser}/{idDiet}:
 *   get:
 *     summary: Récupérer une relation spécifique
 *     tags: [BlacklistedFoodUsers]
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *       - name: idDiet
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du système Leitner
 *     responses:
 *       200:
 *         description: Relation récupérée avec succès.
 *       404:
 *         description: Relation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/:idUser/:idDiet", controller.findOne);

/**
 * @swagger
 * /blacklistedFoodUsers/{idUser}/{idDiet}:
 *   put:
 *     summary: Mettre à jour les droits d'une relation existante
 *     tags: [BlacklistedFoodUsers]
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *       - name: idDiet
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du système Leitner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               writeRight:
 *                 type: boolean
 *                 example: true
 *               shareRight:
 *                 type: boolean
 *                 example: true
 *               shareWithWriteRightRight:
 *                 type: boolean
 *                 example: false
 *               shareWithAllRights:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Droits mis à jour avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:idUser/:idDiet", controller.update);

/**
 * @swagger
 * /blacklistedFoodUsers/{idUser}/{idDiet}:
 *   delete:
 *     summary: Supprimer une relation entre un utilisateur et un système Leitner
 *     tags: [BlacklistedFoodUsers]
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *       - name: idDiet
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du système Leitner
 *     responses:
 *       200:
 *         description: Relation supprimée avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:idUser/:idDiet", controller.delete);

module.exports = (app) => {
    /**
   * @swagger
   * tags:
   *   name: BlacklistedFoodUsers
   *   description: Gestion des droits utilisateurs sur les systèmes Leitner
   */
  app.use("/BlacklistedFood", authMiddleware, router);
};
