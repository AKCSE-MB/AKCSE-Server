import { Controller, Get } from '@nestjs/common';
import { ConfigurationService } from '@domain/configuration/configuration.service';

@Controller('v1/configuration')
export class V1ConfigurationController {
  constructor(private readonly cfgService: ConfigurationService) {}

  /**
   * @TODO add validation rule, only check for us
   * @tag configuration
   * @summary get server configuration
   */
  @Get('/')
  getServerConfig() {
    return this.cfgService.getServerConfig();
  }

  /**
   * @tag configuration
   * @summary get server status
   */
  @Get('/healthcheck')
  getServerStatus() {
    return this.cfgService.getServerMetaData();
  }
}
