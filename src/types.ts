export type Note = {
  text: string;
};

export type Link = {
  title: string;
  url: string;
};

export type Code = {
  code: string;
};

export type Record = {
  id: string;
  type: string;
  content: Note | Link | Code;
};
