module.exports = {
    name: "ping",
    description: "Ping interaction, if you want one.",

    run: async (client, interaction) => {
        // send bot ping and ws latency
        interaction.followUp({ content: `Ping : \`${client.ws.ping} ms\` 🚀` });

    }
};
