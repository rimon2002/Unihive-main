// backend/routes/groupRoutes.js
import express from 'express';
import { createGroup, getGroupDetails } from '../controllers/groupController.js';

const router = express.Router();

// Route to create a group
router.post('/', createGroup);

// Route to get a group by ID
router.get('/:groupId', getGroupDetails);

export default router;
