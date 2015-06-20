# EcmaScript 6 Quiz

`es6-quiz` is a very simple and fun quiz, to run in the command line, for both learning the new EcmaScript 6 syntax and new features and to test your skills as a javascript developer. It's fun for the whole family. 

![es6-quiz screenshot](http://i.imgur.com/Lc8h3eJ.png)

# How to use it

First, make sure you have the following modules installed.

```
npm install colors
```

The application `app.js` is written in ES6, so you might need a transpiler i.e `babel`. Use `index.js` to perform actions like these.

```
npm install babel

iojs index.js
-- or --
babel-node app.js
```

# Manage and add plugins

If you want to support this little fun app, make sure you add some plugins and submit them.

Plugins are the questions that show up when you are doing the quiz. To manage and add plugins, you have `build.js`, which is available in `es6-quiz/plugins/`.

A plugin is a directory `es6-quiz/plugins/{plugin name}`, that has the following files:

`plugin.json`
```javascript
{
    "intro": "What does the following log to the console?",
    "answers": [
        "(nothing)",
        "1",
        "undefined",
        "null"
    ],
    "correct": 1, // index of answers array
    "code": "code.js",
    "readme": "README.md"
}
```

`code.js` - codecase to be analyzed by who is taking the quiz
```javascript
function* g() { 
    yield 1;
}

for (let i of g())
    console.log(i);
```

`README.md` - explanation of the mechanisms and answer
```
# generators-yield

// ...
```

## Adding the plugin

After you have your directory set, you'll have to add the plugin name (a.k.a plugin directory name) to the `plugins` array in `es6-quiz/plugins/plugins.json`.

There you have it, working plugin! 

# License

WTFPL