const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const {
  addNotes,
  getNotes,
  removeNotes,
  listNotes,
  readNote,
} = require("./notes");

// console.log(yargs.argv);

// yargs.version("1.1.0");
//add ,remove,read,list
const commands = ["add", "remove", "read", "list"];
//add note
if (commands.includes(yargs.argv["_"][0])) {
  yargs.command({
    command: "add",
    describe: "adding a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      addNotes(argv.title, argv.body);
    },
  });

  //remove note
  yargs.command({
    command: "remove",
    describe: "removing a note",
    builder: {
      title: {
        describe: "remove a note",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      removeNotes(argv.title);
    },
  });

  //read
  yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
      title: {
        describe: "remove a note",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      readNote(argv.title);
    },
  });

  //list
  yargs.command({
    command: "list",
    describe: "list notes",
    handler: () => {
      listNotes();
    },
  });

  //parse yargs so that it can understand your commands
  yargs.parse();
} else {
  console.log(chalk.red.inverse(`command not found ${yargs.argv["_"][0]}`));
}
