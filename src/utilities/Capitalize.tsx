export const Capitalize = (sentence: string): string => {
    return sentence.replace(/[ ]+/g, "_")
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}