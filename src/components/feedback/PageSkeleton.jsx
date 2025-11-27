// 작성자 : 김민호
import { Shimmer } from './PageSkeleton.styles';

export default function PageSkeleton({ lines = 8 }) {
  return Array.from({ length: lines }).map((_, i) => <Shimmer key={i} />);
}
