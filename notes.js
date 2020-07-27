const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    notes.map((each) => console.log(chalk.yellow.inverse(each.title)));
  } else {
    console.log(chalk.yellow.inverse("No notes present"));
  }
};

const addNotes = (title, body) => {
  const notes = loadNotes();

  //   const duplicateCheck = notes.filter((each) => each.title === title);
  const duplicateCheck = notes.find((each) => each.title === title);
  if (!duplicateCheck) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.yellow.inverse(`Note exists with title ${title}`));
  }
};

const saveNotes = (notes) => {
  const stringifyJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", stringifyJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  if (title) {
    const updatedNotes = notes.filter((each) => each.title !== title);
    if (updatedNotes.length === notes.length) {
      console.log(chalk.yellow.inverse(`No notes exists with title ${title}`));
    } else {
      saveNotes(updatedNotes);
      console.log(chalk.red.inverse("Note removed!"));
    }
  } else {
    console.log(chalk.green.inverse(`Provide title to remove note`));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  if (notes.length > 0) {
    const result = notes.find((each) => each.title === title);
    // console.log("here", result);
    console.log(chalk.green.inverse(JSON.stringify(result)));
  } else {
    console.log(chalk.red.inverse(`Not found with title ${title}`));
  }
};

module.exports = { getNotes, addNotes, removeNotes, listNotes, readNote };
