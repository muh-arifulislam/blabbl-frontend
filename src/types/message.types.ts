export type TMessage = {
  _id?: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
  delivered?: boolean;
  read?: boolean;
};
