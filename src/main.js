
require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");


//This is Where you Import Any Other files You may need ( Reccomended to Connect Functions within Interaction Handler rather than In Main)
const interactionshandler=require("../Modules/Interactionhandler.js")
const eventNotifier = require("../Modules/EventNotifier.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    
  ],
 
});

const ALLOWED_ROLE_ID = '1299292137682112554';  
const channelId = '1298881128186384466'; // Replace with the ID of the channel where reminders should be sent


// Store scheduled events
let scheduledEvents = [];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  // welcome(client);
});

client.on("interactionCreate", async (interaction) => {
    try {

      // Checks if the interaction is a command
      if (!interaction.isCommand()) return;

      // Checks for the required role
      const hasRole = interaction.member.roles.cache.has(ALLOWED_ROLE_ID);
        if (!hasRole) {
          return interaction.reply("You don't have permission to set notifications.");
      }
      
      interactionshandler(interaction)

      const { commandName } = interaction;

      if (commandName === 'registerevent') {
        // Collect event details from the slash command
        const eventId = interaction.options.getString('id')
        const eventName = interaction.options.getString('event_name');
        const eventLocation = interaction.options.getString('event_location');
        const eventDate = interaction.options.getString('event_date');
        const eventTime = interaction.options.getString('event_time');
        
        // Check if the event ID is already in use
        const idExists = scheduledEvents.some(event => event.id === eventId);
        if (idExists) {
        return interaction.reply({ content: `The ID **${eventId}** is already in use with the EVENT **${eventName}**.\n Please choose a different ID.`, ephemeral: true });
        }
    
        // Schedule the event reminder
        eventNotifier.scheduleEventReminder(client, channelId, eventName, eventLocation, eventDate, eventTime, interaction, eventId);

        // Store the event details in the scheduledEvents array
        scheduledEvents.push({
        id: eventId,
        eventName,
        eventLocation,
        eventDate,
        eventTime,
       });
      }

      if (commandName === 'removeevent') {
        const eventId = interaction.options.getString('id');
  
        // Find the event by ID
        const eventIndex = scheduledEvents.findIndex(event => event.id === eventId);
  
        if (eventIndex === -1) {
          return interaction.reply({ content: `No event found with ID **${eventId}**.`, ephemeral: true });
        }
        
        // Remove event from scheduledEvents
        const removedEvent = scheduledEvents.splice(eventIndex, 1)[0];

        // Cancel the scheduled jobs for this event ID
        const isCanceled = eventNotifier.cancelEvent(eventId);

        if (isCanceled) {
          await interaction.reply({
              content: `Event with ID **${eventId}** and Event name **${removedEvent.eventName}** has been removed, and the notification has been canceled.`,
              ephemeral: true,
            });
        } else {
          await interaction.reply({
            content: `Event with ID **${eventId}** has been removed`,
            ephemeral: true,
            });
         }
       }
    }
     catch (error) {
      console.log(error);
      }
 });
client.login(process.env.TOKEN);
