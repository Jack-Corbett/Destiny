const Alexa = require('ask-sdk-core');

// Start a session
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.SPACE)
      .reprompt(messages.SPACE)
      .getResponse();
  },
};

// Tell the user their fortune
const TellHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'TellIntent';
  },
  handle(handlerInput) {
    var response = 'Today, you will ';
    response += FORTUNE[Math.floor(Math.random()*20)] + '. ' + messages.STOP;
    
    return handlerInput.responseBuilder
      .speak(messages.SPACE)
      .withSimpleCard(skillName, "This is your destiny!")
      .getResponse();
  }
};

// Take the users sign and give the user an answer based on their topic
const UserHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && (request.intent.name === 'UserIntent' || request.intent.name === 'ObjectIntent');
  },
  handle(handlerInput) {
    var response = messages.SPACE;
    var value = handlerInput.requestEnvelope.request.intent.slots.Topic.value;
    console.log(value);

    return handlerInput.responseBuilder
      .speak(response)
      .withSimpleCard(skillName, response)
      .reprompt(response)
      .getResponse();
  }
};

// Help the user understand what the skill is for
const HelpHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.SPACE)
      .reprompt(messages.SPACE)
      .getResponse();
  },
};

// Tell the user destiny can't help with that
const FallbackHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.SPACE)
      .reprompt(messages.SPACE)
      .getResponse();
  },
};

// Exit the skill
const ExitHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.SPACE)
      .getResponse();
  },
};

// Log session end
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

// Handle generic errors
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    return handlerInput.responseBuilder
      .speak(messages.ERROR)
      .getResponse();
  },
};

const skillName = 'Destiny';

const FORTUNE = [
  'run into an old friend and reminisce about old times. It will help to focus your mind on what comes next',
  'start a new adventure that will take some unexpected twists and turns but will present an opportunity to grow',
  'stand by your convictions, don\'t be pushed around, stay strong and you will achieve great things',
  'meet someone new, take the time to get to know them, they will make you smile',
  'finish that job you\'ve been putting off, it\'s the only way to clear your mind',
  'give a freind the advice they need. If you\'re there for them, they will be there for you in the future',
  'help someone in need, sometimes the best reward is what we can do for others',
  'see your efforts come to fruition. Life is a marathon not a sprint and you\'ve earned this',
  'get the support you need. It\'s okay to ask for help. Everyone needs guidance to find their way',
  'go with the flow, sometimes it\'s difficult to break your routine, but great things are coming',
  'find the determination you need, there\'s work to be done but you will find the strength to do it',
  'stop underestimating yourself, believe others when they tell you what a fabulous job you do',
  'get the second chance you\'ve been waiting for, make sure you make the most of the opportunity',
  'find the confidence to make it happen, just go for it, you have nothing to lose',
  'have a beautiful day, filled with opportunity, so get out there and make the most of it',
  'prove yourself and reap the rewards, it\'s been a long time coming',                 
  'try something new, it might be out of your comfort zone to begin with but trying new things is the only way to grow',
  'catch the eye of someone new, this might start a new romance or just form a new friendship',
  'explore new opportunities, you won\'t know what you\'re missing out on until you try it',
  'save someone\'s day with your kindness. Be there for them and they will return the favour when you\'re in need of support'
];

const messages = {
  WELCOME: 'Welcome to Destiny, your personal fortune-teller! You can ask me to tell you your basic fortune or you can tell me your star sign to help me look deeper into your future.',
  HELP: 'You can say tell me my fortune or I\'m, followed by your star sign to find out a deeper fortune, or you can say stop.',
  HELP_REPROMPT: 'Ask me for your fortune.',
  // Minimise the message period to ensure the Skill is listening for as long as possible
  SPACE: '�. ',
  FALLBACK: 'I\'m sorry I didn\'t catch that. Could you repeat your last request?',
  FALLBACK_REPROMPT: 'Could you repeat your last request?',
  ERROR: 'Sorry, there was an error.',
  STOP: 'Thank you for using Desntiy! Good fortune awaits you! Goodbye.',
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TellHandler,
    UserHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();