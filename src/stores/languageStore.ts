import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Lang = 'en' | 'nl' | 'de' | 'fr';

interface LanguageStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'zential-lang',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: (_: string) => null,
            setItem: (_: string, __: string) => {},
            removeItem: (_: string) => {},
          } as Storage;
        }
        return localStorage;
      }),
    }
  )
);
