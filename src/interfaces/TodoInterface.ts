export default interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'Ej påbörjad' | 'Pågående' | 'Avklarad';
}