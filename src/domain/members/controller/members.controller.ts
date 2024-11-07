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
  MemberRequestDTO,
  MemberResponseDTO,
  TopMemberDTO,
} from '../dto/members.dto';
import {
  getAllMembers,
  getMember,
  createMember,
  searchMember,
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
  async addMember(@TypedBody() memberData: MemberRequestDTO) {
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
  ): Promise<BaseResponseDto<MemberResponseDTO>> {
    const member = await getMember(id);
    return new BaseResponseDto(member);
  }

  /**
   * @tag members
   * @summary get a member with the passed search key
   * @security bearer
   */
  @TypedRoute.Get('search/:searchKey')
  @HttpCode(200)
  async searchMember(
    @TypedParam('searchKey') searchKey: string,
  ): Promise<BaseResponseDto<MemberResponseDTO>[]> {
    const members = await searchMember(searchKey);
    const memberArr: BaseResponseDto<MemberResponseDTO>[] = members.map(
      (member) => new BaseResponseDto(member),
    );

    return memberArr;
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
    @TypedBody() memberData: MemberResponseDTO,
  ) {
    await editMember(id, memberData);
  }

  /**
   * @tag leaderboard
   * @summary Delete a member
   * @security bearer
   */
  @TypedRoute.Delete('/:id')
  @HttpCode(204)
  async deleteMember(@TypedParam('id') id: number) {
    await removeMember(id);
  }
}
