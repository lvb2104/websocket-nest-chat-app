import { Module } from '@nestjs/common';
import { MyGateway } from './events.gateway';

@Module({
    providers: [MyGateway],
})
export class GatewayModule {}
