import { format } from 'date-fns';

import ServiceTag from '@/components/common/ServiceTag';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/common/Table';

import * as S from './ConflictingDeploymentsList.styles';

export default function ConflictingDeploymentsList({ deployments = [] }) {
  if (!deployments || deployments.length === 0) {
    return null;
  }

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '—';
    try {
      const date = new Date(dateTimeStr);
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch {
      return dateTimeStr;
    }
  };

  return (
    <S.Container>
      <S.WarningMessage>
        다음 배포 작업이 금지 기간과 충돌하여 취소됩니다:
      </S.WarningMessage>
      <S.TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <S.TableHeadOverride>제목</S.TableHeadOverride>
              <S.TableHeadOverride>연관 서비스</S.TableHeadOverride>
              <S.TableHeadOverride>예정 일시</S.TableHeadOverride>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment, index) => (
              <TableRow
                key={`conflict-${deployment.id}-${deployment.scheduledAt}-${index}`}
              >
                <TableCell>{deployment.title}</TableCell>
                <TableCell>
                  <S.ServiceTagWrapper>
                    {deployment.relatedProjects?.map((project) => (
                      <ServiceTag key={project} service={project} />
                    ))}
                  </S.ServiceTagWrapper>
                </TableCell>
                <S.TimeCell>
                  {formatDateTime(deployment.scheduledAt)}
                </S.TimeCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </S.TableWrapper>
    </S.Container>
  );
}
