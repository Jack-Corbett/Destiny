const Alexa = require('ask-sdk-core');

// Start a session
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Launch')
      .reprompt('Launch reprompt')
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
    var response = 'You will ';
    response += DESTINY[Math.floor(Math.random()*20)] + '. ' + messages.STOP;
    
    return handlerInput.responseBuilder
      .speak(response)
      .withSimpleCard(skillName, response)
      .getResponse();
  }
};

// Take the users sign and give the user an answer based on their topic
const SignHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    return request.type === 'IntentRequest' && (request.intent.name === 'AriesIntent' || request.intent.name === 'TaurusIntent' || 
    request.intent.name === 'GeminiIntent' || request.intent.name === 'CancerIntent' || request.intent.name === 'LeoIntent' ||
    request.intent.name === 'VirgoIntent' || request.intent.name === 'LibraIntent' || request.intent.name === 'ScorpioIntent' ||
    request.intent.name === 'SagittariusIntent' || request.intent.name === 'CapricornIntent' || request.intent.name === 'AquariusIntent' ||
    request.intent.name === 'PiscesIntent');
  },
  handle(handlerInput) {
    var response = messages.SPACE;
    var value = handlerInput.requestEnvelope.request.intent.slots.Topic.value;
    console.log(value);

    return handlerInput.responseBuilder
      .speak('sign recorded')
      .withSimpleCard(skillName, response)
      .reprompt('sign reprompt')
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
      .speak('help')
      .reprompt('help reprompt')
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
      .speak('fallback')
      .reprompt('fallback reprompt')
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
      .speak('exit')
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

const DESTINY = [

];

const messages = {
  WELCOME: 'Welcome to Destiny, your personal fortune-teller!',
  HELP: 'You can say tell me my fortune, or you can say exit.',
  HELP_REPROMPT: 'Ask me for your fortune.',
  SPACE: '�. ',
  FALLBACK: 'Destiny can\'t help you with that. It can tell you your fortune by saying: tell me my destiny.',
  FALLBACK_REPROMPT: 'To find out your fortune say: tell me my destiny.',
  ERROR: 'Sorry, I couldn\'t fetch your fortune.',
  STOP: 'Have a great day! Goodbye.',
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TellHandler,
    SignHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();