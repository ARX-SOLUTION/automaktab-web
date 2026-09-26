export function shouldRunLiquid(options: {
  reducedMotion: boolean;
  saveData: boolean;
}): boolean {
  return !options.reducedMotion && !options.saveData;
}
