export type BoardType = {
    id: number
    row: number
    col: number
    value: number | number[]
}[]

export type PositionType = {
    row: number
    col: number
}

export type InputModeType = 'exact' | 'candidate'

export type DifficultyType = 'easy' | 'medium' | 'hard' | 'very-hard' | 'insane' | 'inhuman'

declare global {
    interface Window {
        __sudoku_solve?: () => void
    }
}
