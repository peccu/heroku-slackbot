'use strict';

const slack = require('slack');
const _ = require('lodash');
const config = require('./config');

let bot = slack.rtm.client();

bot.started((payload) => {
  this.self = payload.self;
});


let supportMobileReddit = (msg) => {
};

let slackPost = (channel, text) => {
  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: channel,
    username: 'Starbot',
    text: text
  }, (err, data) => {
    if (err) throw err;

    let txt = _.truncate(data.message.text);

    console.log(`🤖  beep boop: I responded with "${txt}"`);
  });
};

bot.message((msg) => {
  if (!msg.user) return;
  if (msg.user == this.self.id) return;
    console.log({msg: msg, me: this.self});
  if (msg.text.match(/www.reddit.com/igm)) {
      slackPost(msg.channel, msg.text);
      return;
  }

  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

  slackPost(msg.channel, `beep boop: I hear you loud and clear!"`);
});

module.exports = bot;
