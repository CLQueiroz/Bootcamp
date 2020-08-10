import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvallabilityService from '@modules/appointments/services/ListProviderDayAvallabilityService';

export default class ProvidersDayAvallabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvallabilityService = container.resolve(
      ListProviderDayAvallabilityService,
    );

    const avallability = await listProviderDayAvallabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(avallability);
  }
}
