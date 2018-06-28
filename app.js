const botBuilder = require("botbuilder");
const restify = require("restify");

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3798, () => {
  console.log(`${server.name} listening on ${server.url}`);
});

const connector = new botBuilder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

server.post("/api/messages", connector.listen());

const bot = new botBuilder.UniversalBot(connector, session => {
  session.send(`you said ${session.message.text}`);
});
