import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvallabilityController from '../controllers/ProviderDayAvallabilityController';
import ProviderMonthAvallabilityController from '../controllers/ProviderMonthAvallabilityController';
// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvallabilityController = new ProviderMonthAvallabilityController();
const providerDayAvallabilityController = new ProviderDayAvallabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvallabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvallabilityController.index,
);

export default providersRouter;
