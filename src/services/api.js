import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pc0tuzspt2.execute-api.us-east-1.amazonaws.com/dev/api',
});
export default {
  getBooks: () => instance.get('books'),
  createBook: (data) => instance.post('books', data)
}