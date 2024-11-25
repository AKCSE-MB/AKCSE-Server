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
  TopMemberResponseDTO,
} from '../dto/members.dto';
import {
  getAllMembers,
  getMember,
  createMember,
  editMember,
  removeMember,
  createLeaderboard,
} from '../service/members.service';
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
  async getMembers(): Promise<BaseResponseDto<MemberResponseDTO>[]> {
    const members = await getAllMembers();
    const memberArr: BaseResponseDto<MemberResponseDTO>[] = members.map(
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
  async getLeaderboard(): Promise<BaseResponseDto<TopMemberDTO>[]> {
    const topMembers = await createLeaderboard();
    const leaderboard: BaseResponseDto<TopMemberDTO>[] = topMembers.map(
      (member) => new BaseResponseDto(member),
    );

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
    @TypedBody() memberData: MemberUpdateDTO,
  ): Promise<BaseResponseDto<MemberResponseDTO>> {
    const updated = await editMember(id, memberData);
    return new BaseResponseDto(updated);
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
  ): Promise<BaseResponseDto<MemberResponseDTO>> {
    const deleted = await removeMember(id);
    return new BaseResponseDto(deleted);
  }
}
