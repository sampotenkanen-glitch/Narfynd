export type Weights = {
  cost: number;
  co2: number;
  weather: number;
};

const KEYS: (keyof Weights)[] = ["cost", "co2", "weather"];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function normaliseWeights(changedKey: keyof Weights, changedValue: number, current: Weights): Weights {
  const next = { ...current, [changedKey]: clamp(changedValue) };
  const otherKeys = KEYS.filter((k) => k !== changedKey);
  const otherCurrentTotal = otherKeys.reduce((sum, key) => sum + clamp(current[key]), 0);
  const remaining = clamp(1 - next[changedKey]);

  if (otherCurrentTotal === 0) {
    const split = remaining / otherKeys.length;
    for (const key of otherKeys) next[key] = split;
  } else {
    for (const key of otherKeys) {
      next[key] = (clamp(current[key]) / otherCurrentTotal) * remaining;
    }
  }

  const total = KEYS.reduce((sum, key) => sum + next[key], 0);
  if (total > 0) {
    for (const key of KEYS) next[key] = next[key] / total;
  }

  return next;
}
