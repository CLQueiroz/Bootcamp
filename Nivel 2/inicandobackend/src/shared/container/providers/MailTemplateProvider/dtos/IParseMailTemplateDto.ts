interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTempalteDto {
  file: string;
  variables: ITemplateVariables;
}
