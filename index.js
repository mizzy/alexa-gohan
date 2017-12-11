'use strict';

const Alexa = require('alexa-sdk');
const line = require('@line/bot-sdk');
const user = require('./user');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config)

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '誰にごはんだよと伝えますか');
    },

    'MeshiIntent': function () {
        var name = this.event.request.intent.slots.Name.value;
        client.pushMessage(user.id[name], {type: "text", text: "ごはん"})
        .then(() => {
            this.emit(':tell', name + 'にごはんだよと伝えました');
            this.context.succeed();
        })
        .catch((err) => {
            this.context.done(err);
        });
    }
};
