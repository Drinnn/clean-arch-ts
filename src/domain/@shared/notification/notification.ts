export interface NotificationError {
  message: string;
  context: string;
}

export class Notification {
  private errors: NotificationError[] = [];

  public addError(error: NotificationError): void {
    this.errors.push(error);
  }

  public messages(context?: string): string {
    let message = "";
    this.errors.forEach((error) => {
      if (!context || error.context === context)
        message += `${error.context}: ${error.message},`;
    });

    return message;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
