'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app;
  const apiV1Router = router.namespace('/api/v1');
  const { user } = controller.api;

  // 用户
  apiV1Router.get('user/:username', user.show);
};
