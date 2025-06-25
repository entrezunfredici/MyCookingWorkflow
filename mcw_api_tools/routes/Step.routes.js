const express = require("express");
const step = require("../controllers/Step.controller.js");
const authMiddleware = require("../middlewares/Auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * /steps/all:
 *   get:
 *     summary: Récupère toutes les étapes
 *     tags:
 *       - Steps
 *     responses:
 *       200:
 *         description: Liste de toutes les étapes
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
 *                   position:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/all", authMiddleware, step.findAll);

/**
 * @swagger
 * /steps/{id}:
 *   get:
 *     summary: Récupère une étape par son ID
 *     tags:
 *       - Steps
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID des étapes
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: étape correspondant à l'ID
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
 *                 position:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: étape non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", authMiddleware, step.findOne);

/**
 * @swagger
 * /steps/add:
 *   post:
 *     summary: Ajoute un nouveau étape
 *     tags:
 *       - Steps
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
 *               position:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: étape créé avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/add", authMiddleware, step.create);

/**
 * @swagger
 * /steps/{id}:
 *   put:
 *     summary: Met à jour un étape existant
 *     tags: [Steps]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du étape à mettre à jour
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
 *              position:
 *               type: integer
 *               example: 2
 *     responses:
 *       200:
 *         description: étape mis à jour avec succès.
 *       404:
 *         description: étape non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/:id", authMiddleware, step.update);

/**
 * @swagger
 * /steps/{id}:
 *   delete:
 *     summary: Supprime un étape par son ID
 *     tags: [Steps]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du étape à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: étape supprimé avec succès.
 *       404:
 *         description: étape non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", authMiddleware, step.delete);

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   - name: Steps
   *     description: Gestion des étapes
   */
  app.use("/steps", router);
};