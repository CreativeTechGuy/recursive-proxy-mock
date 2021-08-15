export function developmentLog(...messages: unknown[]): void {
    if (process.env.NODE_ENV !== "production") {
        console.warn(...messages);
    }
}
