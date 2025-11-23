CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    CPF VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE "Book" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    author VARCHAR(255) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    ISBN VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE "Borrow" (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    date_return DATE NOT NULL,
    date_borrow DATE NOT NULL,
    date_devolution DATE NULL,

    CONSTRAINT fk_borrow_user
        FOREIGN KEY (user_id) REFERENCES "User"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_borrow_book
        FOREIGN KEY (book_id) REFERENCES "Book"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
