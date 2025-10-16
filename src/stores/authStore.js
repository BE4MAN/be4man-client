import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { extractUserFromToken, isTokenValid } from '@/utils/jwt';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // 액션: 토큰 저장
      setTokens: (accessToken, refreshToken) => {
        const user = extractUserFromToken(accessToken);
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: !!user && isTokenValid(accessToken),
        });
      },

      // 액션: 사용자 정보 설정
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user && !!get().accessToken,
        }),

      // 액션: 로그아웃
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      // 액션: 사용자 정보 업데이트
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // 액션: 로딩 상태
      setLoading: (isLoading) => set({ isLoading }),

      // 헬퍼: 인증 여부 체크
      checkAuth: () => {
        const { accessToken, user } = get();
        return !!accessToken && !!user && isTokenValid(accessToken);
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
