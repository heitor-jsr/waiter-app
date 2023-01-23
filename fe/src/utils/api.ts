import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});


// websocket permite a criação de um canal de comunicação direto entre front e backend, permitindo a troca de informações entre eles sem a necessidade que o front peça (faça a requisição), e sem a necessidade que o back dependa da requisição para enviar a resposta. com isso, a partir do momento que é adicionado um item pelo app mobile, o back ja envia diretamente as infos para o front, sem a necessidade dele fazer a requisição.
// essa conexão é estabelecida a partir da primeira req. essa implementação é feita no código do backend
