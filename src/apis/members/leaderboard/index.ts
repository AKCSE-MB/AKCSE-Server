import http from '../../http';
import { TopMembersResponseDTO } from '@dev-taeho/akcse_mb/lib/domain/members/dto/members.dto';

export const getLeaderboard = async () => {
  const res = await http.get<TopMembersResponseDTO[]>(
    'apis/v1/members/leaderboard',
  );

  if (res?.data) {
    return res?.data;
  }
};
