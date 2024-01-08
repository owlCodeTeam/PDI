export interface SocketGatewayInterface {
  sendNotification(notification: string): Promise<void>;
  handleMessage(message: string): Promise<void>;
}
