import { IBooks } from "./books"

export type ILibraries = {
    id: number,
    name: string,
    Books: IBooks[],
    createdAt: string,
    updatedAt: string
}