export function range(range: number | undefined) {
    return [...Array(range).keys()].map((res) => res + 1);
}
