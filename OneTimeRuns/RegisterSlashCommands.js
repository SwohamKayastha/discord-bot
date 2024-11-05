// require('dotenv').config();
// const { REST, Routes,ApplicationCommandOptionType } = require('discord.js');


// //The Below Snippets Shows How to Create a Slash Command( generally for Moderator and Higher Level Use (Make the Command Name and Conditions Discriptive ))
// // const commands = [
// //   {
// //     name: 'createrole',
// //     description: 'create a new role along with the needed channel(Admin Level Only)',
// //     options:[
// //       {
// //         name:'role_name',
// //         description:'name of the role',
// //         type: ApplicationCommandOptionType.String,
// //         required: true,
// //       },
// //       {
// //         name: 'role_emoji',
// //         description: 'emoji for the role',
// //         type: ApplicationCommandOptionType.String,
// //         required: true,
// //       },
     
     
// //     ]
// //   },
// //   {
// //     name: 'createproject',
// //     description: 'create a new role project with the needed channel(Admin Level Only)',
// //     options:[
// //       {
// //         name:'project_name',
// //         description:'name of the project',
// //         type: ApplicationCommandOptionType.String,
// //         required: true,
// //       },
// //       {
// //         name: 'project_emoji',
// //         description: 'emoji for the project',
// //         type: ApplicationCommandOptionType.String,
// //         required: true,
// //       },
     
     
// //     ]
// //   },
// //   {
// //     name: 'deletechannel',
// //     description: 'create a new role project with the needed channel(Admin Level Only)',
    
// //   },
  


 
// // ];

// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// (async () => {
//   try {
//     console.log('Registering slash commands...');

//     await rest.put(
//       Routes.applicationGuildCommands(
//         process.env.CLIENT_ID,
//         process.env.GUILD_ID
//       ),
//       { body: commands }
//     );

//     console.log('Slash commands were registered successfully!');
//   } catch (error) {
//     console.log(`There was an error: ${error}`);
//   }
// })();


require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// Command Definitions
const commands = [
  {
    name: 'registerevent',
    description: 'Input the detail of the event',
    options: [
      {
        name: 'id',
        description: 'sets the event id',
        type: ApplicationCommandOptionType.String,
        required: true,

      },
      {
        name: 'event_name',
        description: 'Name of the event to add',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'event_location',
        description: 'Location of the Event',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'event_date',
        description: 'Date of the event (YYYY-MM-DD)',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'event_time',
        description: 'Time of the event (HH:mm) eg: 11:00, 23:00',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      
    ],
  },
  {
    name: 'removeevent',
    description: 'removes the scheduled event',
    options: [
      {
        name: 'id',
        description: 'removes the scheduled event id',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: 'showevents',
    description: 'Displays all the registered events',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
