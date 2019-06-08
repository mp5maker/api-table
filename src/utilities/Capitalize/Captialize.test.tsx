// @ts-ignore
import { Capitalize } from "Utilities/Capitalize";

describe("Capitalize Function Test", () => {
    it('Should split the underscores and turn them to individual words', () => {
        const sampleWord = "great_day"
        const capitalizedWord = Capitalize(sampleWord);
        expect(capitalizedWord).toBe("Great Day")
    })
    it("Should turn the spaces into separate words", () => {
        const sampleWordTwo = "Great day to code";
        const capitalizedWordTwo = Capitalize(sampleWordTwo);
        expect(capitalizedWordTwo).toBe("Great Day To Code");
    })
})