// src/features/problem/components/ProblemTypeTree.jsx
import { ChevronRight, ChevronDown, ChevronLeft, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';

import {
  useAllProblemCategoriesQuery,
  useAllProblemsQuery,
} from '@/hooks/useProblemQueries';

import * as S from './ProblemTypeTree.styles';

export function ProblemTypeTree({
  selectedType,
  onSelectType,
  onSelectCase,
  onAddType,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState(new Set());

  const { data: categories = [] } = useAllProblemCategoriesQuery();
  const { data: problems = [] } = useAllProblemsQuery();

  // 카테고리별 문제 목록 그룹핑 (categoryId 기준)
  const categoryProblemsMap = useMemo(() => {
    const map = new Map();
    problems.forEach((problem) => {
      const categoryId = problem.categoryId;
      if (!categoryId) return;
      if (!map.has(categoryId)) {
        map.set(categoryId, []);
      }
      map.get(categoryId).push(problem);
    });
    return map;
  }, [problems]);

  const toggleType = (categoryId) => {
    const newExpanded = new Set(expandedTypes);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedTypes(newExpanded);
  };

  if (collapsed) {
    return (
      <S.Container $collapsed>
        <S.Header>
          <S.CollapseButton onClick={() => setCollapsed(false)}>
            <ChevronLeft size={20} />
          </S.CollapseButton>
        </S.Header>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>문제 유형</S.Title>
        <S.HeaderButtons>
          <S.CollapseButton onClick={onAddType} title="카테고리 추가">
            <Plus size={20} />
          </S.CollapseButton>
          <S.CollapseButton onClick={() => setCollapsed(true)} title="접기">
            <ChevronRight size={20} />
          </S.CollapseButton>
        </S.HeaderButtons>
      </S.Header>

      <S.TreeContainer>
        {categories.map((category) => {
          const isExpanded = expandedTypes.has(category.id);
          const isSelected = selectedType === category.id;
          const problemsInCategory = categoryProblemsMap.get(category.id) || [];

          return (
            <div key={category.id}>
              <S.TreeItem
                $selected={isSelected}
                onClick={() => {
                  toggleType(category.id);
                  onSelectType(category.id);
                  onSelectCase(null);
                }}
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <S.TreeItemText>{category.title}</S.TreeItemText>
                <S.TreeItemCount>{problemsInCategory.length}</S.TreeItemCount>
              </S.TreeItem>

              {isExpanded && (
                <S.ChildrenContainer>
                  {problemsInCategory.map((problem) => (
                    <S.ChildItem
                      key={problem.id}
                      onClick={() => {
                        onSelectCase(problem.id);
                        onSelectType(category.id);
                      }}
                    >
                      {problem.title}
                    </S.ChildItem>
                  ))}
                </S.ChildrenContainer>
              )}
            </div>
          );
        })}
      </S.TreeContainer>
    </S.Container>
  );
}
