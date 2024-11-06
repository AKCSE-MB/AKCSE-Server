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
import { CreateMembersDTO, MembersResponseDTO } from '../dto/members.dto';
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
import {
  getMemberById,
  getMembersBySearch,
} from '../repository/members.repository';
import { error } from 'console';

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
  async addMember(@TypedBody() memberData: CreateMembersDTO) {
    await createMember(memberData);
  }

  /**
   * @tag members
   * @summary get all registered members
   * @security bearer
   */
  @TypedRoute.Get()
  @HttpCode(200)
  async getMembers(): Promise<MembersResponseDTO[]> {
    const members = await getAllMembers();
    // const memberArr: BaseResponseDto<object>[] = members.map(
    //     (member) => new BaseResponseDto(member)
    // );

    return members;
  }

  /**
   * @tag members
   * @summary get a member with the passed id
   * @security bearer
   */
  @TypedRoute.Get('/:id')
  @HttpCode(200)
  async getMemberById(id: number): Promise<BaseResponseDto<object>> {
    const member = await getMemberById(id);
    if (member) return new BaseResponseDto(member);

    throw new error();
  }

  /**
   * @tag members
   * @summary get a member with the passed id
   * @security bearer
   */
  @TypedRoute.Get('/:searchKey')
  @HttpCode(200)
  async getMembesrBySearch(
    searchKey: string,
  ): Promise<BaseResponseDto<object>[]> {
    const members = await getMembersBySearch(searchKey);
    const memberArr: BaseResponseDto<object>[] = members.map(
      (member) => new BaseResponseDto(member),
    );

    return memberArr;
  }

  /**
   * @tag members
   * @summary get a member with the passed id
   * @security bearer
   */
  @TypedRoute.Get('/leaderboard')
  @HttpCode(200)
  async getLeaderboard(): Promise<BaseResponseDto<object>[]> {
    const topMembers = await createLeaderboard();
    const leaderboard: BaseResponseDto<object>[] = topMembers.map(
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
    @TypedBody() memberData: MembersResponseDTO,
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
