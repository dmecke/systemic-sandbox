import Debugging from './src/Debug/Debugging';

declare global {
    interface Window {
        debugging: Debugging;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    }
}
