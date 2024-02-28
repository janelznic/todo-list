import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  constructor() {}

  @Get()
  getVersionInfo() {
    return {
      message: 'System running.',
      version: '4.0',
    };
  }
}
