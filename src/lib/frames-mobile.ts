const modules = import.meta.glob("../assets/frames-mobile/*.jpg", { eager: true });

export const FRAME_URLS_MOBILE: string[] = Object.keys(modules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return numA - numB;
  })
  .map((key) => (modules[key] as { default: string }).default);

export const FRAME_COUNT_MOBILE = FRAME_URLS_MOBILE.length;