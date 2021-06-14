 module.exports = async client => {
 const { readdirSync } = require("fs");
  readdirSync("../commands/").forEach(dir => {
    const commands = readdirSync(`../commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let command = require(`../commands/${dir}/${file}`);
      console.log(`${command.category}|${command.name} Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
    }
  });
  readdirSync("././events/").forEach(dir => {
    const evals = readdirSync(`../events/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
  for (let file of evals) {
      let events = require(`../events/${dir}/${file}`);
      let fileName = file.substring(0, file.length - 3);
     events(client);
      const description = {
        name: fileName,
        filename: file,
        version: `4.8`
      };
      console.log(
        `⬜️ Module: ${description.name} | Loaded version ${description.version} | form("${description.filename}")`
      );
    }
  })
}