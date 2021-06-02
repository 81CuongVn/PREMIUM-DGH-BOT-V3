module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "admin",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run: (client, message, args) => {
    let cmdname = args[0];
    if (!cmdname)
      return message.channel.send(
        `:x: You have to give command name, \`addcmd <cmd_name> <cmd_responce>\``
      );
    let cmdresponce = args.slice(1).join(" ");
    if (!cmdresponce)
      return message.channel.send(
        `:x: You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\``
      );
    let database = client.db.get(`cmd_${message.guild.id}`);
    if (database && database.find(x => x.name === cmdname.toLowerCase()))
      return message.channel.send(
        ":x: This command name is already added in guild custom commands."
      );
    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    };
    client.db.push(`cmd_${message.guild.id}`, data);
    return message.channel.send(
      "Added **" + cmdname.toLowerCase() + "** as a custom command in guild."
    );
  }
};
