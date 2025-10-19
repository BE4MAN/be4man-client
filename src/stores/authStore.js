import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 상태
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      // 액션: Access Token 저장
      setTokens: (accessToken) => {
        set({
          accessToken,
          isAuthenticated: !!accessToken,
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
          isAuthenticated: false,
        }),

      // 액션: 사용자 정보 업데이트
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // 액션: 로딩 상태
      setLoading: (isLoading) => set({ isLoading }),

      // 헬퍼: 인증 여부 체크 (토큰과 사용자 정보 존재 확인)
      checkAuth: () => {
        const { accessToken, user } = get();
        return !!accessToken && !!user;
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
