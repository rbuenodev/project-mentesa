import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SessionDto, SessionPKsDto } from "./dtos/Session.dto";
import { IProfessionalId } from "../Profissional/dtos/IProfessional";
import { fetchSessionById, fetchSessionList } from "./service";

export function useSessionList(
  id: IProfessionalId
): UseQueryResult<SessionDto[]> {
  const queryKey = ["sessionList"];
  return useQuery(queryKey, () => fetchSessionList(id), {
    keepPreviousData: true,
  });
}

export function useSessionById({
  professionalId,
  sessionId,
}: SessionPKsDto): UseQueryResult<SessionDto> {
  const queryKey = ["sessionById"];
  return useQuery(
    queryKey,
    () => fetchSessionById({ professionalId, sessionId }),
    {
      keepPreviousData: true,
    }
  );
}
