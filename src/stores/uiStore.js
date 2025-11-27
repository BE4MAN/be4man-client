// 작성자 : 김민호, 이원석
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      sidebarOpen: false,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      service: 'Service A',
      setService: (service) => set({ service }),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme, service: s.service }),
    },
  ),
);
