export type BoardType = {
    id: number
    row: number
    col: number
    value: number | number[]
}[]

export type Position = {
    row: number
    col: number
}

export type InputModeType = 'exact' | 'alternative'
