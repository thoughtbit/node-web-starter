import { Router } from 'express';

const userRouter = new Router();

userRouter.get('/user*', async (req, res, next) => {
	res.json({ "route": "user" });
});

export default userRouter;