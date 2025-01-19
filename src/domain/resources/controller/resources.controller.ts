import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@common/exception/exception.filter';
import { TypedBody, TypedRoute, TypedParam } from '@nestia/core';
import {
  ResourcesCreateDTO,
  ResourceUpdateDTO,
  ResourceResponseDTO,
} from '@domain/resources/dto/resources.dto';
import {
  getAllResources,
  getResource,
  createResource,
  editResource,
  removeResource,
} from '@domain/resources/service/resources.service';
import { BaseResponseDto } from '@common/dto/base.dto';
import { AuthGuard } from '@common/auth/auth.guard';

@Controller('v1/resources')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class ResourcesController {
  /**
   * @tag resources
   * @summary create a new resource
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Post()
  @HttpCode(200)
  async addResource(
    @TypedBody() resourceData: ResourcesCreateDTO,
  ): Promise<BaseResponseDto<object>> {
    await createResource(resourceData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag resources
   * @summary get all posted resources
   */
  @TypedRoute.Get()
  @HttpCode(200)
  async getResources(): Promise<BaseResponseDto<ResourceResponseDTO[]>> {
    const res = await getAllResources();
    return new BaseResponseDto(res);
  }

  /**
   * @tag resources
   * @summary get a resource with the passed id
   */
  @TypedRoute.Get('/:id')
  @HttpCode(200)
  async getResource(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<ResourceResponseDTO>> {
    const res = await getResource(id);
    return new BaseResponseDto(res);
  }

  /**
   * @tag resources
   * @summary Update an existing resource's details
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  async updateResource(
    @TypedParam('id') id: number,
    @TypedBody() resourceData: ResourceUpdateDTO,
  ): Promise<void> {
    const res = await editResource(id, resourceData);
  }

  /**
   * @tag resources
   * @summary Delete a resource
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Delete('/:id')
  @HttpCode(200)
  async deleteResource(@TypedParam('id') id: number): Promise<void> {
    const res = await removeResource(id);
  }
}
