export interface NotificationErrorProps {
  message: string;
  context: string;
}

export class Notification {
  private errors: NotificationErrorProps[] = [];

  public getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public addError(error: NotificationErrorProps): void {
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
}
