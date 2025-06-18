const express = require("express");
const controller = require("../controllers/DietUsers.controller");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /dietUsers/add:
 *   post:
 *     summary: Créer une relation entre un utilisateur et un système Leitner
 *     tags: [DietUsers]
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
 * /dietUsers/all:
 *   get:
 *     summary: Récupérer toutes les relations entre utilisateurs et systèmes Leitner
 *     tags: [DietUsers]
 *     responses:
 *       200:
 *         description: Liste de toutes les relations récupérées avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/all", controller.findAll);

/**
 * @swagger
 * /dietUsers/{idUser}/{idDiet}:
 *   get:
 *     summary: Récupérer une relation spécifique
 *     tags: [DietUsers]
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
 * /dietUsers/{idUser}/{idDiet}:
 *   put:
 *     summary: Mettre à jour les droits d'une relation existante
 *     tags: [DietUsers]
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
 * /dietUsers/{idUser}/{idDiet}:
 *   delete:
 *     summary: Supprimer une relation entre un utilisateur et un système Leitner
 *     tags: [DietUsers]
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
   *   name: dietUsers
   *   description: Gestion des droits utilisateurs sur les systèmes Leitner
   */
  app.use("/dietusers", router);
};
