#! /usr/bin/env node
const { program } = require("commander");
const generate = require("./commands/generate");

//  Define the generate command
program
  .command("generate <filename>")
  .description(
    "Create a new CSV file with the hash of the old file appended to it"
  )
  .action(generate);

program.parse(process.argv);
