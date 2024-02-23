export interface ITodo {
    title: string
    id: string
}
export interface ITodosObject {
    [key: string]: ITodo[]
}
