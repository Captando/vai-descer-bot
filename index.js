const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const path = require('path');

const client = new Client({
   intents: [
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMessages,
       GatewayIntentBits.MessageContent,
       GatewayIntentBits.GuildVoiceStates,
       GatewayIntentBits.GuildMembers,
       GatewayIntentBits.DirectMessages
   ]
});

// Configurações
let USUARIO_ALVO = '229407493145624576';
const MUSICA_PATH = path.join(__dirname, 'public', 'musica.mp3');

const LETRA = [
   "Nós vai descer, vai descer",
   "Descer lá pra BC no finalzin' do ano",
   "Os Cowboy vai litorando e vai torar você",
   "Nós vai descer, vai descer",
   "Descer lá pra BC no finalzin' do ano",
   "Os bombonzin' 'tão brozeando pra eu chegar e morder",
   "Nós vai descer, vai descer",
   "Descer lá pra BC no finalzin' do ano",
   "Os Cowboy vai litorando e vai torar você, eh eh",
   "É Brenno & Matheus",
   "E DJ Ari SL (eu disse DJ Ari SL)",
   "De tanque cheio a Bodona",
   "O Cowboy 'tá sem vergonha",
   "Hoje eu saio da zona rural",
   "Eu 'to bicho solto no pique lobo mau",
   "Meu ano só começa depois do carnaval"
];

const player = createAudioPlayer({
   behaviors: {
       noSubscriber: NoSubscriberBehavior.Play
   }
});

let currentConnection = null;
let isPlaying = false;
let letraInterval = null;
let letraIndex = 0;

function pararTudo() {
   isPlaying = false;
   if (letraInterval) {
       clearInterval(letraInterval);
       letraInterval = null;
   }
   if (currentConnection) {
       currentConnection.destroy();
       currentConnection = null;
   }
   letraIndex = 0;
}

async function enviarProximaParte(guild) {
   if (isPlaying && letraIndex < LETRA.length) {
       try {
           // Pegar o usuário alvo
           const usuario = await client.users.fetch(USUARIO_ALVO);
           // Enviar mensagem privada
           await usuario.send(LETRA[letraIndex]);
           letraIndex = (letraIndex + 1) % LETRA.length;
       } catch (error) {
           console.error('Erro ao enviar DM:', error);
           // Se não conseguir enviar DM, tenta enviar no canal
           const channel = guild.channels.cache.find(ch => ch.type === 0);
           if (channel) {
               channel.send(`<@${USUARIO_ALVO}> ${LETRA[letraIndex]}`);
               letraIndex = (letraIndex + 1) % LETRA.length;
           }
       }
   }
}

client.on('ready', () => {
   console.log(`Bot está online como ${client.user.tag}`);
});

// Configurar o evento para quando a música terminar
player.on(AudioPlayerStatus.Idle, () => {
   console.log('Música terminou');
   pararTudo();
});

// Comandos
client.on('messageCreate', async message => {
   // Comando para entrar: !descer
   if (message.content === '!descer') {
       if (!message.member.voice.channel) {
           return message.reply('Você precisa estar em um canal de voz!');
       }

       try {
           if (currentConnection) {
               pararTudo();
           }

           currentConnection = joinVoiceChannel({
               channelId: message.member.voice.channel.id,
               guildId: message.guild.id,
               adapterCreator: message.guild.voiceAdapterCreator,
           });

           currentConnection.subscribe(player);

           const resource = createAudioResource(MUSICA_PATH);
           player.play(resource);
           isPlaying = true;

           // Inicia o envio da letra
           letraIndex = 0;
           if (letraInterval) clearInterval(letraInterval);
           letraInterval = setInterval(() => enviarProximaParte(message.guild), 1000);

           message.reply('VAI DESCER! 🎵');
       } catch (error) {
           console.error('Erro:', error);
           message.reply('Erro ao entrar no canal!');
           pararTudo();
       }
   }

   // Comando para definir alvo: !vaidescer @usuário
   if (message.content.startsWith('!vaidescer')) {
       const mention = message.mentions.users.first();
       if (mention) {
           USUARIO_ALVO = mention.id;
           message.reply(`AGORA VAI DESCER PRO: ${mention.username}`);
       } else {
           message.reply('Use: !vaidescer @usuario');
       }
   }

   // Comando para desconectar: !desce
   if (message.content === '!desce') {
       if (currentConnection) {
           pararTudo();
           message.reply('DESCEU! 👋');
       } else {
           message.reply('Não estou em nenhum canal!');
       }
   }

   // Comando para ver o alvo atual: !descendo
   if (message.content === '!descendo') {
       const targetUser = await client.users.fetch(USUARIO_ALVO);
       message.reply(`DESCENDO PRO: ${targetUser.username}`);
   }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
   if (newState.member.id === USUARIO_ALVO) {
       if (newState.channelId !== oldState.channelId) {
           if (newState.channelId) {
               try {
                   if (currentConnection) {
                       pararTudo();
                   }

                   currentConnection = joinVoiceChannel({
                       channelId: newState.channelId,
                       guildId: newState.guild.id,
                       adapterCreator: newState.guild.voiceAdapterCreator,
                   });

                   currentConnection.subscribe(player);

                   const resource = createAudioResource(MUSICA_PATH);
                   player.play(resource);
                   isPlaying = true;

                   // Inicia o envio da letra
                   letraIndex = 0;
                   if (letraInterval) clearInterval(letraInterval);
                   letraInterval = setInterval(() => enviarProximaParte(newState.guild), 3000);

               } catch (error) {
                   console.error('Erro:', error);
                   pararTudo();
               }
           } else {
               pararTudo();
           }
       }
   }
});

player.on('error', error => {
   console.error('Erro no player:', error);
   pararTudo();
});

// Seu token
client.login('Token aqui');