declare module '@/utils/sudoku' {
    type CellValue = number | number[]

    interface Sudoku {
        generate(difficulty: string | number, unique?: boolean): string
        solve(board: string, reverse?: boolean): string | false
        $generate(difficulty: string | number, unique?: boolean): [CellValue[], number[]]
    }

    const sudoku: Sudoku
    export default sudoku

    export function stringToArray(str: string): CellValue[]
    export function arrayToString(arr: CellValue[]): string | false
}
