import { clientCases, type ClientCase } from "./clientCases";
import { productions, type Production } from "./productions";

export type Example = (ClientCase & { kind: "case"; headline: string }) | (Production & { kind: "format" });

// One shared order and source of copy for the homepage wheel and examples grid.
// Only explicitly featured customer work is listed alongside the format examples.
export const examples: Example[] = [
  ...clientCases.filter(project => project.featured).map(project => ({ ...project, kind: "case" as const, headline: project.title })),
  ...productions.map(format => ({ ...format, kind: "format" as const })),
];
