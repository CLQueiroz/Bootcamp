import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvallabilityService from '@modules/appointments/services/ListProviderMonthAvallabilityService';

export default class ProvidersMonthAvallabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvallabilityService = container.resolve(
      ListProviderMonthAvallabilityService,
    );

    const avallability = await listProviderMonthAvallabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(avallability);
  }
}
