# DiscordFASC Bot Setup Guide

## Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/Drakesward/DiscordFASC
```

## Setting Up the Bot

1. **Add Your Bot Token**  
   To start, you must add the token of your Discord bot in the `.env` file located at the root of the bot folder.  
   Example:
   ```env
   TOKEN="YourBotTokenHere"
   ```

2. **Getting Your Bot Token and Configuring Privileged Intents**  
   To get your bot token and ensure the bot has the correct 'privileged intents,' follow these steps:

   - **Access the Discord Developer Portal**  
     - Go to the [Discord Developer Portal](https://discord.com/developers/applications).  
     - Log in using your Discord account if prompted.

   - **Create a New Application**  
     - Click the **"New Application"** button in the top-right corner.  
     - Enter a name for your application (this will be the name of your bot) and click **"Create"**.

   - **Under Installation**  
     - Look under 'Guild Install.'  
     - Click the dropdown next to 'Scopes.'  
     - Add 'bot.'

   - **Set Up Your Bot**  
     - On the application's dashboard, navigate to the **"Bot"** tab on the left menu.  
     - Click **"Add Bot"**, then confirm by clicking **"Yes, do it!"**.

   - **Enable Privileged Gateway Intents**  
     - Scroll down to the **"Privileged Gateway Intents"** section.  
     - Toggle on the following intents as needed:
       - **Presence Intent** (if your bot monitors user statuses).  
       - **Server Members Intent** (if your bot interacts with server members).  
       - **Message Content Intent** (if your bot processes message content).  
     - Click **"Save Changes"**.

   - **Copy Your Bot Token**  
     - Under the **"Bot"** tab, click **"Reset Token"** and confirm.  
     - Copy the bot token shown. You'll need this to run your bot.

3. **Install Dependencies**  
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

4. **Edit the `config.json` File**  
   Modify the `config.json` file to include your desired configuration:

   ```json
   {
       "default": "test",
       "forumPostChannelId": [
           "id_forum_n1", // Right-click the Discord channel, copy ID, and paste it here.
           "id_forum_n2" // Right-click the Discord channel, copy ID, and paste it here.
       ],
       "forumPostMessage": [
           "message_forum_n1", // Enter the message you want in the forum.
           "message_forum_n2"  // Enter the message you want in the other forum.
       ],
       "forumPostTitle": [
           "Title_Embed_post_n1", // Embed title for forum post 1.
           "Title_Embed_post_n2"  // Embed title for forum post 2.
       ]
   }
   ```

## Customizing the Bot

1. **Update Buttons and Embed Artwork**  
   Navigate to the `Handler` folder and open `index.js`. Customize buttons and embed content as needed. Example:

   ```javascript
   // Add additional example buttons
   const button = new ButtonBuilder()
       .setLabel("Button One!")
       .setURL("https://button.link")
       .setStyle(ButtonStyle.Link);
   const button1 = new ButtonBuilder()
       .setLabel("Button Two!")
       .setURL("https://button.link")
       .setStyle(ButtonStyle.Link);
   const button2 = new ButtonBuilder()
       .setLabel("Button Three!")
       .setURL("https://button.link")
       .setStyle(ButtonStyle.Link);
   row.addComponents(button, button1, button2);

   // Embed for the thread creation
   const embed = new EmbedBuilder()
       .setTitle(config.forumPostTitle[i])
       .setDescription(config.forumPostMessage[i])
       .setTimestamp()
       .setColor("#B9E0A2")
       .setFooter({
           text: "Your Server Name",
           iconURL: 'https://icon.url'
       });
   ```

## Running the Bot

Once everything is configured, start the bot using the following command:

```bash
node index.js
```

Your Discord bot is now ready to use!
```
