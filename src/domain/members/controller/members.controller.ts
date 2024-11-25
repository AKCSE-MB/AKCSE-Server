import {
  Controller,
  HttpCode,
  Injectable,
  UseFilters,
  Get,
  Post,
  Put,
  Delete,
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
  createLeaderboard,
} from '@domain/members/service/members.service';
import { BaseResponseDto } from '@root/src/common/dto/base.dto';

@Controller('v1/members')
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class MembersController {
  /**
   * @tag members
   * @summary get the top 5 members by score to create the leaderboard
   * @security bearer
   */
  @TypedRoute.Post()
  @HttpCode(200)
  async addMember(@TypedBody() memberData: MemberCreateRequestDTO) {
    await createMember(memberData);
  }

  /**
   * @tag members
   * @summary get all registered members
   * @security bearer
   */
  @TypedRoute.Get()
  @HttpCode(200)
  async getMembers(): Promise<BaseResponseDto<MembersResponseDTO>[]> {
    const res = await getAllMembers();
    const memberArr: BaseResponseDto<MembersResponseDTO>[] = res.map(
      (member) => new BaseResponseDto(member),
    );

    return memberArr;
  }

  /**
   * @tag members
   * @summary get a member with the passed id
   * @security bearer
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
   * @summary get top 5 members with the highest scores
   * @security bearer
   */
  @TypedRoute.Get('/leaderboard/top5')
  @HttpCode(200)
  async getLeaderboard(): Promise<BaseResponseDto<TopMembersResponseDTO>[]> {
    const topMembers = await createLeaderboard();
    const leaderboard: BaseResponseDto<TopMembersResponseDTO>[] =
      topMembers.map((member) => new BaseResponseDto(member));

    return leaderboard;
  }

  /**
   * @tag member
   * @summary Update an existing member's details
   * @security bearer
   */
  @TypedRoute.Put('/:id')
  @HttpCode(200)
  async updateMember(
    @TypedParam('id') id: number,
    @TypedBody() memberData: MemberUpdateRequestDTO,
  ): Promise<BaseResponseDto<MembersResponseDTO>> {
    const res = await editMember(id, memberData);
    return new BaseResponseDto(res);
  }

  /**
   * @tag leaderboard
   * @summary Delete a member
   * @security bearer
   */
  @TypedRoute.Delete('/:id')
  @HttpCode(200)
  async deleteMember(
    @TypedParam('id') id: number,
  ): Promise<BaseResponseDto<MembersResponseDTO>> {
    const res = await removeMember(id);
    return new BaseResponseDto(res);
  }
}
