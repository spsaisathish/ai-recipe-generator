import { Injectable } from '@nestjs/common';
import { HealthStatus } from '../utils/interfaces';
import { version } from '../utils/config';

@Injectable()
export class HealthService {

   getHealthStatus(): HealthStatus {
        return {
            status: 'UP',
            message: 'Recipe AI API Running',
            version: version
        }
    }
}
