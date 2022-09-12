Here i will explain step by step what i followed

Follow This [Link](https://www.youtube.com/watch?v=F2JCjVSZlG0&t=134s)

1. npx create-react-app my-app --template typescript

2. remove extra files from src directory and add Quiz text in app.tsx in return like below

```
function App() {
  return <div className="App">Quiz</div>;
}

```

3. npm i styled-components @types/styled-components

4. download images from git [repo](https://github.com/weibenfalk/react-quiz)

5. google font Link place in index.html file

```
<link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@700&family=Fascinate+Inline&display=swap" rel="stylesheet">
```

6. api intergration using [trivia](https://opentdb.com/api_config.php) genearte api-url (https://opentdb.com/api.php?amount=10&type=multiple)
