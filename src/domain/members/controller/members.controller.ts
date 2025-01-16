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
  MemberCreateRequestDTO,
  MemberUpdateRequestDTO,
  MembersResponseDTO,
  TopMembersResponseDTO,
} from '@domain/members/dto/members.dto';
import {
  getAllMembers,
  getMember,
  createMember,
  editMember,
  removeMember,
  getLeaderboard,
} from '@domain/members/service/members.service';
import { BaseResponseDto } from '@common/dto/base.dto';
import { AuthGuard } from '@common/auth/auth.guard';

@Controller('v1/members')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class MembersController {
  /**
   * @tag members
   * @summary create a new member
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Post()
  @HttpCode(200)
  async addMember(
    @TypedBody() memberData: MemberCreateRequestDTO,
  ): Promise<BaseResponseDto<object>> {
    await createMember(memberData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag members
   * @summary get all registered members
   */
  @TypedRoute.Get()
  @HttpCode(200)
  async getMembers(): Promise<BaseResponseDto<MembersResponseDTO[]>> {
    const res = await getAllMembers();
    return new BaseResponseDto(res);
  }

  /**
   * @tag members
   * @summary get top 5 members with the highest scores
   */
  @TypedRoute.Get('/leaderboard')
  @HttpCode(200)
  async getLeaderboard(): Promise<BaseResponseDto<TopMembersResponseDTO[]>> {
    const res = await getLeaderboard();
    return new BaseResponseDto(res);
  }

  /**
   * @tag members
   * @summary get a member with the passed id
   */
  @TypedRoute.Get('/:id')
  @HttpCode(200)
  async getMember(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<MembersResponseDTO>> {
    const res = await getMember(id);
    return new BaseResponseDto(res);
  }

  /**
   * @tag members
   * @summary Update an existing member's details
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  async updateMember(
    @TypedParam('id') id: number,
    @TypedBody() memberData: MemberUpdateRequestDTO,
  ): Promise<BaseResponseDto<object>> {
    await editMember(id, memberData);
    return new BaseResponseDto({ state: 'success' });
  }

  /**
   * @tag members
   * @summary Delete a member
   * @security bearer
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Delete('/:id')
  @HttpCode(200)
  async deleteMember(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<object>> {
    await removeMember(id);
    return new BaseResponseDto({ state: 'success' });
  }
}
