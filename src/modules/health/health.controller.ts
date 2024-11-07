import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PrismaService } from '@common/database/service/prisma.service';
import { LogAction } from '@common/decorator/log-actions.decorator';
import { LogActions } from '@common/enum/LogActions';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @LogAction(LogActions.HEALTH_CHECK)
  @Get()
  @HealthCheck()
  async checkDisk() {
    return await this.health.check([
      // Disk
      async () =>
        await this.disk.checkStorage('storage', {
          path: '/urs/app',
          thresholdPercent: 0.9,
        }),
      // Memory
      async () => await this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),
      // Prisma
      async () => await this.prismaHealth.pingCheck('prisma', this.prisma),
    ]);
  }
}
