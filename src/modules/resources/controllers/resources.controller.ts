import type { Response } from 'express';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Resource } from '../entities/resources.entity';
import { ResourceDTO } from '../models/resource.model';
import { ResourceService } from '../services/resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(
    @Inject()
    private readonly resourceService: ResourceService,
  ) { }

  @Post()
  async createResource(@Body() resource: ResourceDTO, @Res() res: Response) {
    await this.resourceService.createResource(resource);
    return res.status(201).send({ message: 'Recurso criado com sucesso.' });
  }

  @Get()
  async listAllResources(@Res() res: Response) {
    const arrResources: Resource[] = await this.resourceService.listResources();
    return res.status(200).send(arrResources);
  }

  @Get(':id')
  async listOneResource(@Param('id', ParseIntPipe) resourceId: number, @Res() res: Response) {
    const resource: null | Resource = await this.resourceService.listOneResource(resourceId);
    if (!resource)
      return res.status(404).send({ message: 'Recurso não foi encontrado.' });

    return res.status(200).send(resource);
  }

  @Put(':id')
  async updateResource(@Param('id', ParseIntPipe) resourceId: number, @Body() resource: ResourceDTO, @Res() res: Response) {
    const update: UpdateResult = await this.resourceService.updateResource(resourceId, resource);
    if (update.affected === 0)
      return res.status(404).send({ message: 'Recurso não foi encontrado.' });

    res.status(201).send({ message: 'Recurso atualizado com sucesso.' });
  }

  @Delete(':id')
  async deleteResource(@Param('id', ParseIntPipe) resourceId: number, @Res() res: Response) {
    const deleted: DeleteResult = await this.resourceService.deleteResource(resourceId);
    if (deleted.affected === 0)
      return res.status(404).send({ message: 'Recurso não foi encontrado.' });

    return res.status(200).send({ message: 'Recurso deletado com sucesso.' });
  }
}
