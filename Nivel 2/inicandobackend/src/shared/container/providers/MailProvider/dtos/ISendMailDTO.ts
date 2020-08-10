import IParseMailTempalteDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDto';

interface IMailContent {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContent;
  from?: IMailContent;
  subject: string;
  templateData: IParseMailTempalteDTO;
}
