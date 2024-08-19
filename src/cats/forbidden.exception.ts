import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  getResponse(): string | object {
    return {
      statusCode: this.getStatus(),
      message: this.message,
      cause: 'Đây hả',
    };
  }
  initMessage(): void {
    this.message = 'Message bị đổi ở đây hả';
  }
}
