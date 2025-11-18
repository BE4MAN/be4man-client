import { ChevronRight, ChevronDown, ChevronLeft, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';

import { mockProblemCategories, mockProblems } from '@/mock/problem';

import * as S from './ProblemTypeTree.styles';

export function ProblemTypeTree({
  selectedType,
  onSelectType,
  onSelectCase,
  onAddType,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState(new Set([1, 2]));

  // 카테고리별 문제 그룹화
  const categoryProblemsMap = useMemo(() => {
    const map = new Map();
    mockProblems.forEach((problem) => {
      const categoryId = problem.category.id;
      if (!map.has(categoryId)) {
        map.set(categoryId, []);
      }
      map.get(categoryId).push(problem);
    });
    return map;
  }, []);

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
        {mockProblemCategories.map((category) => {
          const isExpanded = expandedTypes.has(category.id);
          const isSelected = selectedType === category.id;
          const problems = categoryProblemsMap.get(category.id) || [];

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
                <S.TreeItemCount>{problems.length}</S.TreeItemCount>
              </S.TreeItem>

              {isExpanded && (
                <S.ChildrenContainer>
                  {problems.map((problem) => (
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
