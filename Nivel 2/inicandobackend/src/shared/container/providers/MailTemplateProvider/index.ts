import { container } from 'tsyringe';

import ImailTemplateProvider from './models/IMailTemplateProvider';

import HandleBarsMailTemplateProvider from './implementations/HandlebarMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<ImailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
