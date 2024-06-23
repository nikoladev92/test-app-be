import {
    Get,
    JsonController,
  } from 'routing-controllers';
  import { ResponseSchema } from 'routing-controllers-openapi';
import { FilesService } from 'api/services/files.service';

  @JsonController('/files')
  export class FilesController {
    constructor(private filesService:FilesService) {}
    @Get('/')
    @ResponseSchema(null)
    public async getFiles() {
      const data = await this.filesService.fetchFiles();
      return data
    }
}