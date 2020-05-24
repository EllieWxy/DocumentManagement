// declare module '*.m.css' {
//     const style: any;
//     export default style;
// }

declare module '*.m.css' {
    export const content: { [className: string]: string };
    export default content;
}
