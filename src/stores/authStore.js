import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // 액션: Access Token & Refresh Token 저장
      setTokens: (accessToken, refreshToken) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken && !!refreshToken,
        });
      },

      // 액션: 사용자 정보 설정
      setUser: (user) =>
        set({
          user,
          isAuthenticated:
            !!user && !!get().accessToken && !!get().refreshToken,
        }),

      // 액션: 로그아웃
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });

        // localStorage에서 auth-store 완전히 제거
        localStorage.removeItem('auth-store');
      },

      // 액션: 사용자 정보 업데이트
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // 액션: 로딩 상태
      setLoading: (isLoading) => set({ isLoading }),

      // 헬퍼: 인증 여부 체크 (토큰과 사용자 정보 존재 확인)
      checkAuth: () => {
        const { accessToken, refreshToken, user } = get();

        // 마이그레이션: refreshToken 없으면 강제 로그아웃
        if (accessToken && !refreshToken) {
          get().logout();
          return false;
        }

        return !!accessToken && !!refreshToken && !!user;
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
