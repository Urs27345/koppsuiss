// lib/getDictionary.ts
export const getDictionary = async (locale: string) => {
  try {
    const dict = await import(`./translations/${locale}.json`);
    return dict.default;
  } catch (e) {
    // fallback to English
    const fallback = await import(`./translations/en.json`);
    return fallback.default;
  }
};
