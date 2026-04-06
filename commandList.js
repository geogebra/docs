"use strict";

function gatherCommands(contentAggregateItem) {
  // Here we collect the tags
  const collectedTagsByPrefix = {};
  // Sort the prefixes and create an object for each in the collectedTagsByPrefix object
  let fileContent = "";

  contentAggregateItem.files.forEach((file) => {
    if (file.path.includes(".adoc")) {
      console.log("Checking " + file.path);
      const buffer = Buffer.from(file._contents);
      const previousTextOfFile = buffer.toString("utf-8");
      if (previousTextOfFile.match(/page-en\: commands\/[a-zA-Z0-9]+\r?\n/)) {
        const commandName = file.path
          .replaceAll("\\", "/")
          .split("/")
          .reverse()[0]
          .replace(".adoc", "");
        fileContent += `* xref:/commands/${commandName}.adoc[${commandName}]\n`;
      }
    }
  });
  return fileContent;
}

function generateFile(contentAggregateItem, fileContent) {
  const file = contentAggregateItem.files.find((file) => {
    const buffer = Buffer.from(file._contents);
    const previousTextOfFile = buffer.toString("utf-8");
    return previousTextOfFile.match("page-en: commands/All_Commands");
  });
  console.log("Updating " + file?.path);
  if (!file) {
    return;
  }
  const buffer = Buffer.from(file._contents);
  const previousTextOfFile = buffer.toString("utf-8");

  // Combine the previous content with the newly generated tags
  const content = `${previousTextOfFile}\n\n` + `${fileContent}`;

  const _contents = Buffer.from(content, "utf-8");

  file._contents = _contents;
}

module.exports.register = function () {
  this.once("contentAggregated", ({ contentAggregate }) => {
    contentAggregate.forEach((contentAggregateItem, index) => {
      const fileContent = gatherCommands(contentAggregateItem);
      generateFile(contentAggregateItem, fileContent);
    });
  });
};
