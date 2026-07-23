export const environmentEnum = ["development", "production"] as const;

export type Environment = (typeof environmentEnum)[number];
