export type IBooks = {
    id: number;
    isbn: number;
    title: string;
    author: string;
    summary: string;
    image: string;
    pages: number;
    editor: string
    publication_year: number;
}

export type ILibrary = {
    id: number;
    name: string;
    Books: Book[];
  };