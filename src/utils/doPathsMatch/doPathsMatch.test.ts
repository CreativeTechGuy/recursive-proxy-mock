import { doPathsMatch } from "./doPathsMatch";
import * as DoArraysMatchModule from "~/utils/doArraysMatch/doArraysMatch";

describe("doPathsMatch", () => {
    test("calls doArraysMatch", () => {
        const doArraysMatchSpy = jest.spyOn(DoArraysMatchModule, "doArraysMatch");

        const symbol = Symbol("test");
        const a = ["a", symbol, "b"];
        const b = ["a", symbol, "b"];
        expect(doPathsMatch(a, b)).toStrictEqual(true);

        expect(doArraysMatchSpy).toHaveBeenCalledWith(a, b);
    });
});
