# Quiz Generator

A React webpage that displays flash cards constructed from specifically formatted .txt files.

## Usage

All quiz files should be placed in `./public/Decks`. The `Summary.txt` should contain the name of each quiz file delimited with `'-'`. For example...

```
-
Quiz name 1
-
Quiz name 2
-
Quiz name 3
-
```

Make sure not to use duplicate Quiz names.

To create the corresponding quizzes, each question and answer pair should be delimited with `'--'`, and the question and answer within that sperated by a `'-'`. For example...

In a file named `Quiz name 1.txt`:

```
--
Question 1
-
answer to question 1
--
Question 2
-
answer to question 2
--
```

This will now generate a quiz called `'Quiz name 1'` onto the webpage, which can be ran using `yarn start`.
