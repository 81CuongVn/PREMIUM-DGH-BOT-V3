const { MessageEmbed } = require("discord.js");
module.exports = async client => {
  client.on("messageReactionAdd", async (reaction, user) => {
    let { guild } = reaction.message;
    let chx = await client.data.get(`starboard_${guild.id}`);
    if (chx === null) return;
    const starboard = client.channels.cache.get(chx);
    if (!starboard) return;
    const handleStarboard = async () => {
      const embed = new MessageEmbed()
        .setAuthor(
          reaction.message.author.tag,
          reaction.message.author.displayAvatarURL()
        )
        .setDescription(reaction.message.content)
        .addField(
          "Original",
          `**[Jump to the message](${reaction.message.url})**`
        )
        .setColor("YELLOW")
        .setFooter(reaction.message.id)
        .setTimestamp();
      if (reaction.message.attachments.first())
        embed.setImage(reaction.message.attachments.first().proxyURL);
      if (reaction.message.attachments.first())
        embed.addField(
          `Attachments`,

          `**[${reaction.message.attachments.array()[0].name}](${
            reaction.message.attachments.first().proxyURL
          })**`
        );
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg =
         msgs.find(msg =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        )
        .catch(e => {
          client.send(e, reaction.message);
        });
      if (existingMsg) {
        existingMsg.edit(
          `${f(reaction.count)} ${reaction.count} | <#${
            reaction.message.channel.id
          }>`,
          embed
        );
      } else {
        if (starboard)
          starboard.send(`⭐ 1 | <#${reaction.message.channel.id}>`, embed);
      }
    };
    if (reaction.emoji.name === "⭐") {
      if (reaction.message.channel.name.toLowerCase() === starboard.name)
        return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    let { guild } = reaction.message;
    let chx = await client.data.get(`starboard_${guild.id}`);
    if (chx === null) return;
    const starboard = client.channels.cache.get(chx);
    if (!starboard) return;
    const handleStarboard = async () => {
      const embed = new MessageEmbed()
        .setAuthor(
          reaction.message.author.tag,
          reaction.message.author.displayAvatarURL()
        )
        .setDescription(reaction.message.content)
        .addField(
          "Original",
          `**[Jump to the message](${reaction.message.url})**`
        )
        .setColor("YELLOW")
        .setFooter(reaction.message.id)
        .setTimestamp();
      if (reaction.message.attachments.first())
        embed.setImage(reaction.message.attachments.first().proxyURL);
      if (reaction.message.attachments.first())
        embed.addField(
          `Attachments`,

          `**[View Attachments](${
            reaction.message.attachments.first().proxyURL
          })**`
        );
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg =>
        msg.embeds.length === 1
          ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
            ? true
            : false
          : false
      );
      if (existingMsg) {
        if (reaction.count === 0) existingMsg.delete({ timeout: 2500 });
        else
          existingMsg.edit(
            `${f(reaction.count)} ${reaction.count} | <#${
              reaction.message.channel.id
            }>`,
            embed
          );
      }
    };
    if (reaction.emoji.name === "⭐") {
      if (reaction.message.channel.name.toLowerCase() === starboard.name)
        return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
  });
};

let f = function(e) {
  if (e > 49) {
    return "💫";
  } else if (e > 19) {
    return "🌠";
  } else if (e > 12) {
    return "🌟";
  } else {
    return "⭐";
  }
};
