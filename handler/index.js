const {
    ActionRowBuilder,
    ButtonBuilder,
    ChannelType,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");
const stringSimilarity = require("string-similarity"); // Install with `npm install string-similarity`
const client = require("../index");
const config = require("../config.json");

client.on('threadCreate', async (thread) => {
    if (thread.type == ChannelType.GuildPublicThread) {
        for (let i = 0; i < config.forumPostChannelId.length; i++) {
            if (thread.parentId == config.forumPostChannelId[i]) {
                const row = new ActionRowBuilder();

                // Add configured buttons
                if (config.forumPostButtons.hasOwnProperty(thread.parentId)) {
                    let check = config.forumPostButtons[thread.parentId];
                    for (let j = 0; j < check.length; j++) {
                        row.addComponents(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel(config.forumPostButtons[thread.parentId][j].label)
                                .setURL(config.forumPostButtons[thread.parentId][j].url)
                        );
                    }
                }

                // Add additional example buttons
                const button = new ButtonBuilder()
                    .setLabel("FAQs")
                    .setURL("https://discord.com/channels/1204418766318862356/1317696921527390228")
                    .setStyle(ButtonStyle.Link);
                const button1 = new ButtonBuilder()
                    .setLabel("Tech Support Example")
                    .setURL("https://discord.com/channels/1204418766318862356/1327432101724946432")
                    .setStyle(ButtonStyle.Link);
                const button2 = new ButtonBuilder()
                    .setLabel("Bug Report Example")
                    .setURL("https://discord.com/channels/1204418766318862356/1327435370232549416")
                    .setStyle(ButtonStyle.Link);
                row.addComponents(button, button1, button2);

                // Embed for the thread creation
                const embed = new EmbedBuilder()
                    .setTitle(config.forumPostTitle[i])
                    .setDescription(config.forumPostMessage[i])
                    .setTimestamp()
                    .setColor("#B9E0A2")
                    .setFooter({
                        text: "The Heroes' Journey",
                        iconURL: 'https://media.discordapp.net/attachments/1325856013101826060/1325856014020378714/Logo_Icon_2.png?ex=67829522&is=678143a2&hm=9558b09931684bf01354506afe9357c3067aaf5dcfaae3a13a1ade8961156aeb&=&format=webp&quality=lossless&width=700&height=700'
                    });

                await thread.send({ embeds: [embed], components: [row] });

                // Search for similar threads
                const channel = thread.parent;
                if (!channel || !channel.threads) return;

                try {
                    // Fetch existing threads
                    const activeThreads = await channel.threads.fetchActive();
                    const archivedThreads = await channel.threads.fetchArchived();
                    const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()]
                        .filter(t => t.id !== thread.id);

                    // Compare thread names
                    const threadNames = allThreads.map(t => t.name);
                    const matches = stringSimilarity.findBestMatch(thread.name, threadNames);

                    // Filter similar threads
                    const recommendations = matches.ratings
                        .filter(r => r.rating > 0.3) // Similarity threshold
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5); // Limit to top 5

                    if (recommendations.length > 0) {
                        const recommendationMessage = recommendations.map(match => {
                            const matchingThread = allThreads.find(t => t.name === match.target);
                            return `• [${match.target}](https://discord.com/channels/${thread.guild.id}/${matchingThread.id}) (Similarity: ${(match.rating * 100).toFixed(2)}%)`;
                        }).join("\n");

                        await thread.send(
                            `Here are some similar threads that might help:\n${recommendationMessage}`
                        );
                    }
                } catch (error) {
                    console.error(`Error searching for similar threads: ${error.message}`);
                }
            }
        }
    }
});
