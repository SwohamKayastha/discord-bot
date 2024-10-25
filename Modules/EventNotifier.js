const { EmbedBuilder,
    Permissions
 } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
    scheduleEventReminder: function(client, channelId, eventName, eventLocation, eventDate, eventTime) {
        // Combine event date and time to create a full date object
        const eventDateTime = new Date(`${eventDate}T${eventTime}:00`);
        if (isNaN(eventDateTime)) {
            return interaction.reply({ content: 'Invalid date or time format. Ensure the format is YYYY-MM-DD HH:mm.', ephemeral: true });
        }

        const now = new Date();
        if (eventDateTime < now) {
            return interaction.reply({ content: 'The event date and time must be in the future.', ephemeral: true });
        }

        // Schedule the reminder (e.g., 30 minutes before the event)
        const reminderTime = new Date(eventDateTime.getTime() - 1 * 60000);  // 30 minutes before

        // Schedule the actual reminder
        schedule.scheduleJob(reminderTime, function() {

            const channel = client.channels.cache.get(channelId); // Replace with the appropriate channel ID
      
            if (channel) {
                sendReminder(channel, eventName, eventLocation, eventDate, eventTime);
            } else {
                console.error(`Channel not found with ID: ${channelId}. Please verify the ID and bot permissions.`);
            }
        });

        // Schedule the event notification at the actual event time
        schedule.scheduleJob(eventDateTime, function() {
            const channel = client.channels.cache.get(channelId);
            if (channel) {
                sendEventStartingNow(channel, eventName, eventLocation);
            } else {
                console.error(`Channel not found with ID: ${channelId}. Please verify the ID and bot permissions.`);
            }
        });


        // Reminder message function
        function sendReminder(channel, eventName, eventLocation, eventDate, eventTime) {
            const reminderEmbed = new EmbedBuilder()
              .setColor('#0099ff') // Fancy blue color, you can change this to any hex color
              .setTitle(`🎉 Upcoming Event: ${eventName}! 🎉`)
              .setDescription(`📅 **Date**: ${eventDate}\n🕒 **Time**: ${eventTime}\n📍 **Location**: ${eventLocation}`)
              .addFields(
                { name: '⏰ Reminder:', value: 'This event starts in **30 minutes**! Make sure you don’t miss it.', inline: false },
                { name: '🔔 Stay Tuned!', value: 'Keep an eye on the announcements for more updates.', inline: false }
                )
              .setFooter({ text: 'We hope to see you there!' })
              .setTimestamp(); // Adds a timestamp of when the message was sent
            
            // Send the embed to the specified channel
            channel.send({ content: '', embeds: [reminderEmbed]}); //@everyone
          }

        // Notifier message function
        function sendEventStartingNow(channel, eventName, eventLocation) {
            const eventEmbed = new EmbedBuilder()
                .setColor('#FF4500')
                .setTitle(`🚨 Event **${eventName}** is Starting Now! 🚨`)
                .setDescription(`📍 **Location**: ${eventLocation}`)
                .addFields(
                    { name: '🎉 The Event is Live!', value: 'The event you’ve been waiting for is happening **right now**! Join us at the location provided.' },
                    { name: '🔔 Don’t Miss It!', value: 'Make sure you’re ready to join in and participate!' }
                )
                .setFooter({ text: 'Hurry up and join us! The fun is just beginning!' })
                .setTimestamp(); // Adds the current timestamp when the event is starting
        
            // Send the embed to the specified channel
            channel.send({ content: '', embeds: [eventEmbed] }); //@everyone
        }
        
    },
};
