import express from 'express';
import { getCommentsByProductId, postNewComment } from '../Controllers/comments-controllers.js';
import ensureAuthorized from '../Middlewares/auth.js';

const router = express.Router();

router.post('/post-comment', ensureAuthorized, postNewComment);
router.get('/:productId', getCommentsByProductId);

export default router;
