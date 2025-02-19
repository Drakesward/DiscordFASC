const { Message, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle, EmbedBuilder } = require("discord.js");
const client = require("../index");
const config = require("../config.json");

client.on('threadCreate', async (thread) => {
    if (thread.type == ChannelType.GuildPublicThread) {
        for (let i = 0; i < config.forumPostChannelId.length; i++) {
            if (thread.parentId == config.forumPostChannelId[i]) {
                const row = new ActionRowBuilder()
                if (config.forumPostButtons.hasOwnProperty(thread.parentId)) {
                    let check = config.forumPostButtons[thread.parentId]
                    for (let j = 0; j < check.length; j++) {
                        row.addComponents(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel(config.forumPostButtons[thread.parentId][j].label)
                                .setURL(config.forumPostButtons[thread.parentId][j].url)
                        )
                    }
                }
                    const button = new ButtonBuilder() // first button for all post (for example the button can redirect to the server rules)
                            .setLabel("")
                            .setURL("")
                            .setStyle(ButtonStyle.Link)
                            row.addComponents(button)
                const embed = new EmbedBuilder()
                    .setTitle(config.forumPostTitle[i])
                    .setDescription(config.forumPostMessage[i])
                    .setTimestamp()
                    .setColor("") // embed color for all post
                    .setFooter({ text: "", iconURL: ''})
                await thread.send({ embeds: [embed], components: [row] })
            }
        }
    }
})
