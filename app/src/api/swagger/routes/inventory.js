/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API para gestionar inventarios
 */

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Agrega un nuevo inventario
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *             required:
 *               - name
 *               - quantity
 *     responses:
 *       201:
 *         description: Inventario agregado correctamente
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Obtiene todos los inventarios
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Lista de inventarios
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Detalles de un inventario específico
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventario encontrado
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Elimina un inventario
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventario eliminado
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory/{id}/activate:
 *   patch:
 *     summary: Activa un producto del inventario
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto activado
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory/{id}/deactivate:
 *   patch:
 *     summary: Desactiva un producto del inventario
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto desactivado
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /inventory/{id}/movement:
 *   post:
 *     summary: Agrega un movimiento al inventario
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [in, out]
 *               quantity:
 *                 type: number
 *             required:
 *               - type
 *               - quantity
 *     responses:
 *       200:
 *         description: Movimiento agregado
 *       400:
 *         description: Error en la solicitud
 */
