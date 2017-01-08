import { Router } from 'express';

const adminRouter = new Router();

adminRouter.get('/admin*', async (req, res, next) => {
	res.json({ "route": "admin" });
});

export default adminRouter;