export type IBooks = {
  id: number;
  isbn: number;
  title: string;
  author: string;
  summary: string;
  image: string;
  pages: number;
  editor: string;
  publication_year: number;
  Genres: IGenre[];
  LibraryBook: ILibraryBook;
};

export type ILibrary = {
  id: number;
  name: string;
  Books: Book[];
};

export type IGenre = {
  name: string;
  id: number;
};

export type ILibraryBook = {
  read: boolean;
  library_id: number;
  book_id: number;
};
