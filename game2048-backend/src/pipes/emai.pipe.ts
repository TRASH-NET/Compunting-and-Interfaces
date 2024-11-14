import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform<string> {
    transform(value: string): string {
        const isValidEmail = this.validateEmail(value);
        if (!isValidEmail) {
            throw new BadRequestException(`Validation failed (email is expected)`);
        }
        return value;
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}