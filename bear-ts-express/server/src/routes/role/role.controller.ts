import { Request, Response, NextFunction } from 'express';
import User from './../../models/user';
import Role from './../../models/role';

export let listRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.query().eager('users').omit(User, ['password']);
    return res.send(roles);
  } catch (error) {
    return next(error);
  }
};

export async function getRole(req, res, next) {
  try {
    const role = await Role.query().findById(req.params.id);

    return res.send(role);
  } catch (error) {
    return next(error);
  }
}

export async function getRoleUsers(req, res, next) {
  try {
    const role = await Role.query()
      .findById(req.params.id)
      .eager('users')
      .omit(User, ['password']);

    return res.send(role);
  } catch (error) {
    return next(error);
  }
}
