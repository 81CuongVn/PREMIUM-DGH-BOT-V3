const backup = require("discord-backup");
module.exports = {
  name: "load-backup",
  description: "load a saved backup, yeah some of them may not saved",
  P_user: ["ADMINISTRATOR"],
  P_bot: ["ADMINISTRATOR"],
  args: true,
  usage: "load-backup <id_backup>",
  category: "backup",
  run: async (client, message, args) => {
    backup
      .fetch(args[0])
      .then(async () => {
        let cc = await client.awaitReply(
          `${await client.emoji(
            "DGH_info"
          )} | When the backup is loaded, all the channels, roles, etc. will be replaced! Type \`confirm\` to confirm!`,
          { message, time: 20000 }
        );
        if (!cc)
          return client.send(
            `${await client.emoji(
              "DGH_error"
            )} | Time's up! Cancelled backup loading!`,
            {
              message
            }
          );
        if (cc[0] === "confirm") {
          backup
            .load(args[0], message.guild)
            .then(async () => {
              client.send(
                `${await client.emoji("DGH_info")} | Start loading the backup!`,
                { message, type: true }
              );
            })
            .catch(err => {
              return client.send(
                ":x: | Sorry, an error occurred... Please check that I have administrator permissions!",
                { message }
              );
            });
        }
      })
      .catch(async e => {
        return client.send(
          `${await client.emoji("DGH_error")} | No backup found for ${args.slice(
            0
          ).join(" ")}`,
          { message }
        );
      });
  }
};
