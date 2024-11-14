import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        if (!ctx.switchToHttp) {
            throw new InternalServerErrorException('Invalid context type (HTTP context expected)');
        }

        const request = ctx.switchToHttp().getRequest();

        if (!request.token) {
            throw new InternalServerErrorException('Token not found in request (AuthGuard missing?)');
        }

        return request.token;
    },
);