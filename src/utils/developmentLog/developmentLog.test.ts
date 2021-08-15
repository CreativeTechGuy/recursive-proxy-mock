import { developmentLog } from "~/utils/developmentLog";

describe("developmentLog", () => {
    beforeEach(() => {
        process.env.NODE_ENV = "test";
    });
    test("uses console.warn in non-production mode", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        developmentLog("message", 123);
        expect(consoleWarnSpy).toHaveBeenCalledWith("message", 123);
    });

    test("does not log in production", () => {
        process.env.NODE_ENV = "production";
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        developmentLog("message", 123);
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
});
