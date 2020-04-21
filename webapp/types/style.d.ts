declare const cssExport: { [key: string]: string };

declare module "*.css" {
  export = cssExport;
}
