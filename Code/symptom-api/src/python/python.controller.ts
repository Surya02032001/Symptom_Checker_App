import { Body, Controller, Get, Post } from '@nestjs/common';
import { PythonService } from './python.service';

@Controller('python')
export class PythonController {

    constructor(private readonly pythonService: PythonService) {}

  @Post('call')
  async callPython(@Body() body) {
    const query = body.message;
    return await this.pythonService.callPythonScript(query);
  }
}
