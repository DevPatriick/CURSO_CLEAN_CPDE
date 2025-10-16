## Reunião

> Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saída de livros. Quremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa biblioteca e pode emprestar os livros a qualquer usuário, além de buscar os registros de empréstimos

## Dados
- Usuário: [Nome, CPF, telefone, endereço, email]
- Livro: [Nome, quantidade, autor, genero, ISBN(codigo isbn do livro)]
- Empréstimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]

## UseCases (Regras de negócios)
[X] Cadastrar um novo usuário
    -> CPF ou email devem ser únicos
[X] Buscar um cadastro de usuário por CPF
    -> Retornar um usuário ou vazio
[X] Cadastrar um novo livro
    -> ISBN deve ser único
[X] Buscar um livro por nome ou ISBN
    -> Retornar os livros ou vazio
[X] Emprestar um livro ao usuario
    -> A data de retorno não pode ser menor que a data de saída
    -> Um usuário não pode estar com mais de um livro com o mesmo ISBN
    -> Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
    -> Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[X] Devolver um livro
    -> Caso o usuário tenha atrasado, será gerada uma multa fixa de R$ 10,00

[X] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antigo

## Usuarios Repository
[X] Cadastrar: [{name, CPF, phone, address, email}] => Promise<void>
[X] userExistByCPF(CPF) => Promise<void>
[X] userExistByEmail(Email) => Promise<void>

## Livros Repository
[X] Cadastrar: ({name, quantity, author, gender, ISBN}) => Promise<void>
[X] existePorISBN: (ISBN) => Promise<boolean>
[X] buscarPorNomeOuISBN: (valor) => Promise<array> de livros

## Emprestimos Repository
[] Emprestar um livro: ({user_id, book_id, date_borrow, date_return}) => Promise<void>
[] Existe Livro ISBN emprestado pendente usuario: ({user_id, book_id}) => Promise<boolean>
[] Devolver livro com e sem multa: ({borrow_id, date_return}) Promise<data_return>