# STerm v1.0

STerm is a JavaScript-based terminal web application. This gimmick employs some very basic, and poorly written, concepts derived from popular Unix-based system's terminals.


I wrote the initial code for this in, like, a couple of hours :P

Live Example: http://sterm.bluelogicteam.com/

## Quick Start

Type commands (listed under `Commands` section of this doc) similar to those you would write in a unix terminal.

After `cd`ing around the terminal, you'll notice that everything is emulated (poorly albeit; try `ls -la` in various folders :D ).

There is a nifty little (working) package manager that doesn't confirm to any standard out there (because why not?).

Try this:
```sh
$ dance
$ pkg-get -v http://sterm.bluelogicteam.com/statics/js/terminal/commands/packages/dance.js
$ dance
```

Woohoo!

Now read about writing commands, go create your own packages, and post about them. (Who cares about CORS, right?)


## Commands

Commands can be found inside the `/statics/js/terminal/commands/` directory. These are simply AMD-style modules that return a function to be executed.

The following commands are pre-packaged with this terminal:

```sh
$ cd
$ clear
$ echo
$ eval
$ exit
$ grep
$ history
$ login
$ ls
$ motd
$ pkg-get
$ pwd
$ ssh
$ su
$ sudohelp
```

Each of these commands _should_ have a usage option (`-h` or `--help`) to help you navigate your way through everything.

In this terminal these is no such thing as permissions except to navigate into `home` directories belonging to a different "user". This too is quite a gimmick, so there are no real directories, and you can simply `su` any user (including root :D )

### Piping Commands

Piping commands works by buffering the output of the previous function and passing it in to the proceeding function.

```
echo "hello world" | grep world
```

Since there's no concept of `stdin` or `stdout`, the output of `echo` is simply appended to the `grep` command like so:

```
echo "hello world"
grep world hello world
```

One day, this gimmick will include `stdin` and `stdout` functionality. Because, why not?

## Writing Commands
Writing commands is as simple as creating an AMD module that returns `this.exit(0)` when it's finished executing. There are many other complex options for more advanced functionality. Believe it or not, when you're developing for a gimmick, anyone can get carried away.

### Sample Command
#### sample.js
```js
define(function(){
	return function(){
		console.log("Executed sample command");
		return this.exit(0);
	};
});
```

### Terminal Output
The terminal works by wrapping the `console.*` methods to wrote all output into both the browser's console and the DOM area built for this terminal app. This preserve's the real `console` but allows for more verbose output into this fake terminal.

## Using the Package Manager
The Package Manager `pkg-get` simply utilize's RequireJS' dependency injection system for retrieving and registering new commands.

```sh
pkg-get -v http://domain/packages/mypackage.js
```

The above will retrieve the AMD package located at `http://domain/packages/mypackage.js` and register it as an executabe named `mypackage`. After pulling it down, it will execute `mypackage --help` to show usage.


# Common Components

## ConsoleWrapper

The ConsoleWrapper consumes the out-of-the-box `console` object and wraps most methods to allow the capturing and routing of certain console messages into the DOM-based terminal.

The ConsoleWrapper overwrites the following:

 * `console.log`
 * `console.info`
 * `console.warn`
 * `console.error`

In addition to routing the output of the above methods to the DOM-based terminal, it also provides the ability for "buffering" these messages using the following experimental methods:

 * `bufferStart` - Starts routing into a private array
 * `bufferEnd` - Resumes routing into STerm
 * `bufferGet` - Returns current collection of messages
 * `bufferClean` - Clears current collection of messages
 * `bufferEndFlush` - Calls `bufferEnd` and then flushes current collection into STerm
 * `bufferGetCleanEnd` - Executes the following:
	* `bufferGet`
	* `bufferClean`
	* `bufferEnd`

## Command
Examples are based on the following command:
```
$ mycmd --parma1 param2
```

### sudo
If `true`, this command was executed with `sudo`

### params
Array of parameters sent to the current command.

```
this.params = ['--param1', 'param2'];
```

### command
Command executed (e.g., `mycmd`)

### origCommand
Original command text (e.g., `mycmd --param1 param2`)

### hasParam( `paramVal`, `orEmpty` )
Checks to see if a parameter exists. If `orEmpty` is `true`, this function will return `true` if there are no params as well. This is useful for `--help` params.

```
this.hasParam('help',true);
```
Will look for `-h`, `--help`, or no parameters

### exit( `code` )
Sends exit code to CommandQueue

```
return this.exit(0);
```

## CommandQueue

The CommandQueue contains all the commands waiting to execute and is accessible via `window.ActiveTerminal.queue`.

The only significant method in this object is `push( )` which allows you to specify commands to execute.

```
ActiveTerminal.queue.push('ssh bk@randy.com');
```

## Terminal

The Terminal employs the singleton pattern and is accessible via `window.ActiveTerminal`.

The terminal has several useful properties and methods.

### container
jQuery object referencing the main terminal element (e.g., `<form class="terminal">`)

### queue
Contains instance of CommandQueue

### session
Contains current instance of Session object

### readyPrompt( )
Ensures the prompt is visible and available for user input.

### pausePrompt( )
Hides the prompt from the user

### getInput( )
Retrieves the `commandInput` element inside the `container`.

### getPromptLead( )
Retrieves the `prompt-lead` element inside the `container`.

### cancelCurrentCommand( )
Kills current prompt and creates a new one. Similar to `Ctrl+C` in real terminals

### listCommands( )
When executed, shows a list of all the currently registered commands available for execution.
