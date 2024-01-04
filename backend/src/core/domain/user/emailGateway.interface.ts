export type emailInputSend = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};
export interface emailGatewayInterface {
  send(emailInput: emailInputSend): Promise<void>;
}
