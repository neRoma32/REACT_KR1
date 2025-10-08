![Component Tree + Data Flow](assets/diagram.png/)

## Патерни

Підняття стану (Lifting State Up):
Весь стан (масив contacts) зберігається в App і передається в таблицю через props.

Умовна візуалізація (Conditional Rendering):
Таблиця показує "No data to display", якщо масив contacts порожній, інакше відображає дані.

Візуалізація списків (Rendering Lists):
Використання методу .map() для динамічного створення рядків таблиці (<tr>) з масиву contacts, з обов'язковим атрибутом key.