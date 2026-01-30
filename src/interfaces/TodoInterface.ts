export default interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'ej påbörjad' | 'pågående' | 'avklarad';
}