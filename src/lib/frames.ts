const modules = import.meta.glob("../assets/frames/*.jpg", { eager: true }) as Record<string, { default: string }>;

export const FRAME_URLS: string[] = Object.keys(modules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] ?? "0", 10);
    return numA - numB;
  })
  .map((key) => modules[key].default);

export const FRAME_COUNT = FRAME_URLS.length;