export function preserveModuleInstance(moduleName: string): void {
    let mockActual: unknown = undefined;
    jest.doMock(moduleName, () => {
        if (mockActual === undefined) {
            mockActual = jest.requireActual(moduleName);
        }
        return mockActual;
    });
}
