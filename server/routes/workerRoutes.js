import express from 'express';
import { registerWorker, getWorkers, getWorkerById } from '../controllers/workerController.js';

const router = express.Router();

router.post('/register', registerWorker);
router.get('/', getWorkers);
router.get('/:id', getWorkerById);

export default router;