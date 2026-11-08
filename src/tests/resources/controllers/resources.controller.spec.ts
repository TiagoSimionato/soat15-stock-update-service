import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from '../../../modules/resources/controllers/resources.controller';
import { Resource } from '../../../modules/resources/entities/resources.entity';
import { ResourceDTO } from '../../../modules/resources/models/resource.model';
import { ResourceService } from '../../../modules/resources/services/resources.service';

const mockResourceDTO: ResourceDTO = {
  cost: 100,
  name: 'Resource A',
  type: 'type-a',
  unit: 'unit-a',
};

const mockResourceEntity: Resource = {
  cost: 100,
  id: 1,
  name: 'Resource A',
  type: 'type-a',
  unit: 'unit-a',
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockResourceService = () => ({
  createResource: jest.fn(),
  createResourceForService: jest.fn(),
  deleteResource: jest.fn(),
  deleteResourceOfAService: jest.fn(),
  listOneResource: jest.fn(),
  listResources: jest.fn(),
  listResourcesOfAService: jest.fn(),
  updateResource: jest.fn(),
  updateResourceQuantityOfAService: jest.fn(),
});

describe('ResourcesController', () => {
  let controller: ResourcesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourceService,
          useFactory: mockResourceService,
        },
      ],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
    service = module.get(ResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createResource', () => {
    it('should return 201 when resource is created successfully', async () => {
      service.createResource.mockResolvedValue(undefined);
      const res = mockResponse();

      await controller.createResource(mockResourceDTO, res);

      expect(service.createResource).toHaveBeenCalledWith(mockResourceDTO);
      expect(service.createResource).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso criado com sucesso.' });
    });
  });

  describe('listAllResources', () => {
    it('should return 200 with all resources', async () => {
      service.listResources.mockResolvedValue([mockResourceEntity]);
      const res = mockResponse();

      await controller.listAllResources(res);

      expect(service.listResources).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([mockResourceEntity]);
    });

    it('should return 200 with empty array when no resources exist', async () => {
      service.listResources.mockResolvedValue([]);
      const res = mockResponse();

      await controller.listAllResources(res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([]);
    });
  });

  describe('listOneResource', () => {
    it('should return 200 with the resource when found', async () => {
      service.listOneResource.mockResolvedValue(mockResourceEntity);
      const res = mockResponse();

      await controller.listOneResource(1, res);

      expect(service.listOneResource).toHaveBeenCalledWith(1);
      expect(service.listOneResource).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockResourceEntity);
    });

    it('should return 404 when resource is not found', async () => {
      service.listOneResource.mockResolvedValue(null);
      const res = mockResponse();

      await controller.listOneResource(99, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso não foi encontrado.' });
    });
  });

  describe('updateResource', () => {
    it('should return 201 when resource is updated successfully', async () => {
      service.updateResource.mockResolvedValue({ affected: 1, generatedMaps: [], raw: {} });
      const res = mockResponse();

      await controller.updateResource(1, mockResourceDTO, res);

      expect(service.updateResource).toHaveBeenCalledWith(1, mockResourceDTO);
      expect(service.updateResource).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso atualizado com sucesso.' });
    });

    it('should return 404 when resource is not found', async () => {
      service.updateResource.mockResolvedValue({ affected: 0, generatedMaps: [], raw: {} });
      const res = mockResponse();

      await controller.updateResource(99, mockResourceDTO, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso não foi encontrado.' });
    });
  });

  describe('deleteResource', () => {
    it('should return 200 when resource is deleted successfully', async () => {
      service.deleteResource.mockResolvedValue({ affected: 1, raw: {} });
      const res = mockResponse();

      await controller.deleteResource(1, res);

      expect(service.deleteResource).toHaveBeenCalledWith(1);
      expect(service.deleteResource).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso deletado com sucesso.' });
    });

    it('should return 404 when resource is not found', async () => {
      service.deleteResource.mockResolvedValue({ affected: 0, raw: {} });
      const res = mockResponse();

      await controller.deleteResource(99, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Recurso não foi encontrado.' });
    });
  });
});
