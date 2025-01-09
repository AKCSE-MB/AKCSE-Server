'use client';

import * as S from './page.styled';
import Header from '@/components/Header/MainHeader';
import { getLeaderboard } from '@/apis/members/leaderboard';
import { useEffect, useState } from 'react';
import { TopMembersResponseDTO } from '@dev-taeho/akcse_mb/lib/domain/members/dto/members.dto';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<TopMembersResponseDTO[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      if (leaderboard) {
        setLeaderboard(leaderboard);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <S.MainContent>
        <Header title="AKCSE MANITOBA" subTitle="Young Generations" BackBtn />

        <S.Title>Top 5 Standings</S.Title>
        <S.Table>
          <S.TheadContainer>
            <S.TableRow>
              <S.TableHeader>Rank</S.TableHeader>
              <S.TableHeader>Member</S.TableHeader>
              <S.TableHeader>Score</S.TableHeader>
            </S.TableRow>
          </S.TheadContainer>
          <S.TbodyContainer>
            {leaderboard.map((member, index) => (
              <S.TableRow key={member.id}>
                <S.TableData>{index + 1}</S.TableData>
                <S.TableData>{member.username}</S.TableData>
                <S.TableData>{member.score}</S.TableData>
              </S.TableRow>
            ))}
          </S.TbodyContainer>
        </S.Table>
      </S.MainContent>
    </>
  );
}
