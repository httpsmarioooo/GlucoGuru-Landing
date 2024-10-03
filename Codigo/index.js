/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = '¡Hola! Soy GlucoGuru, tu asistente personalizado para el manejo de la diabetes. Estoy aquí para ayudarte a mantener un control adecuado de tus niveles de glucosa, brindarte recordatorios para tus medicamentos, consejos nutricionales, rutinas de ejercicio, y mucho más.Prueba diciendo: consejo nutricional: ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const QueAlimentosEvitarHandler = {
    canHandle(handlerInput) {
        return Alexa.getIntentName(handlerInput.requestEnvelope) === 'QueAlimentosEvitarIntent';
    },
    handle(handlerInput) {
        const tipoDiabetes = handlerInput.requestEnvelope.request.intent.slots.tipoDiabetes.value;

        console.log('Valor del slot tipoDiabetes:', tipoDiabetes); // Para depuración

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let ultimoConsejo = sessionAttributes.ultimoConsejo || -1;

        let speechText = '';
        let consejos = [];

        if (tipoDiabetes === 'diabetes tipo 1') {
            consejos = [
                `Para la diabetes tipo 1, es recomendable evitar alimentos altos en azúcar y carbohidratos refinados.
                Bebidas azucaradas: Refrescos, jugos de frutas con azúcar añadida y bebidas energéticas.
                Carbohidratos refinados: Pan blanco, arroz blanco, pasta y cereales azucarados. información obtenida de: healthline.com`,
                
                `Si tienes diabetes tipo 1, evita alimentos que puedan causar picos de azúcar en sangre.
                Incluye en tu lista: Frutas en almíbar, dulces y productos horneados con azúcares añadidos.`
            ];
        } else if (tipoDiabetes === 'diabetes tipo 2') {
            consejos = [
                `Para la diabetes tipo 2, es recomendable evitar alimentos altos en azúcar y carbohidratos refinados.
                Carbohidratos refinados: Pan blanco, arroz blanco, pasta y bollería.
                Vegetales con almidón: Papas y maíz. información obtenida de: goodrx.com.
                Alimentos ultraprocesados: Meriendas empaquetadas, productos horneados industriales y comidas rápidas.`,
                
                `Si tienes diabetes tipo 2, evita consumir: Alimentos fritos y procesados que pueden aumentar tu resistencia a la insulina.
                Opta por alimentos frescos y naturales.`
            ];
        } else if (tipoDiabetes === 'diabetes gestacional') {
            consejos = [
                'Para la diabetes gestacional, controla carbohidratos y azúcares de rápida absorción.',
                
                'Es fundamental evitar los azúcares añadidos y los carbohidratos simples para mantener un nivel de azúcar estable.'
            ];
        } else {
            speechText = 'Por favor, especifica si tienes diabetes tipo 1 o tipo 2 para darte una mejor recomendación.';
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }

        // Seleccionar un nuevo consejo que no sea el último proporcionado
        let nuevoConsejo;
        do {
            nuevoConsejo = Math.floor(Math.random() * consejos.length);
        } while (nuevoConsejo === ultimoConsejo);

        // Guardar el nuevo consejo en los atributos de la sesión
        sessionAttributes.ultimoConsejo = nuevoConsejo;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        // Generar la respuesta con el consejo seleccionado
        speechText = consejos[nuevoConsejo];

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};


const ComoEquilibrarComidasHandler = {
    canHandle(handlerInput) {
        return Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComoEquilibrarComidasIntent';
    },
    handle(handlerInput) {
        const tipoComida = handlerInput.requestEnvelope.request.intent.slots.tipoComida.value;

        console.log('Valor del slot tipoComida:', tipoComida); // Para depuración

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let ultimoConsejo = sessionAttributes.ultimoConsejo || -1;

        let speechText = '';
        let consejos = [];

        if (tipoComida === 'vegetales') {
            consejos = [
                'Para equilibrar tus comidas con vegetales, intenta incluir una variedad de colores y prepáralos con aceites saludables.',
                'Asegúrate de consumir vegetales crudos y cocidos para obtener diferentes nutrientes y fibras.'
            ];
        } else if (tipoComida === 'frutas') {
            consejos = [
                'Cuando equilibres tus comidas con frutas, escoge frutas con bajo índice glucémico como las bayas.',
                'Combina frutas con proteínas como yogur natural o nueces para un mejor control del azúcar.'
            ];
        } else if (tipoComida === 'proteínas') {
            consejos = [
                'Equilibra tus comidas con proteínas como pollo sin piel, pescado o legumbres.',
                'Incluye fuentes de proteínas vegetales, como tofu o frijoles, para una dieta balanceada.'
            ];
        } else {
            consejos = [
                'Para equilibrar tus comidas, asegúrate de incluir vegetales, proteínas magras y carbohidratos complejos.',
                'Recuerda que una comida balanceada debe tener proporciones adecuadas de cada grupo alimenticio.'
            ];
        }

        // Seleccionar un nuevo consejo que no sea el último proporcionado
        let nuevoConsejo;
        do {
            nuevoConsejo = Math.floor(Math.random() * consejos.length);
        } while (nuevoConsejo === ultimoConsejo);

        // Guardar el nuevo consejo en los atributos de la sesión
        sessionAttributes.ultimoConsejo = nuevoConsejo;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        // Generar la respuesta con el consejo seleccionado
        speechText = consejos[nuevoConsejo];

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};



const ConsejoNutricionalHandler = {
    canHandle(handlerInput) {
        return Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsejoNutricionalIntent';
    },
    handle(handlerInput) {
        const enfoqueNutricional = handlerInput.requestEnvelope.request.intent.slots.enfoqueNutricional.value;

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let ultimoConsejo = sessionAttributes.ultimoConsejo || -1;

        let speechText = '';
        let consejos = [];

        if (enfoqueNutricional === 'bajo en carbohidratos') {
            consejos = [
                "Para controlar el azúcar con una dieta baja en carbohidratos, limita los alimentos ricos en harinas refinadas y azúcares.",
                "Una dieta baja en carbohidratos ayuda a estabilizar el azúcar en sangre. Evita los panes blancos y pastas."
            ];
        } else if (enfoqueNutricional === 'alto en fibra') {
            consejos = [
                "Una dieta alta en fibra puede ayudar a controlar el azúcar. Incluye más granos enteros, frutas y verduras.",
                "La fibra es clave para mantener los niveles de azúcar estables. Añade más legumbres, avena y frutas con cáscara a tu dieta."
            ];
        } else if (enfoqueNutricional === 'balanceado') {
            consejos = [
                "Un enfoque nutricional balanceado es ideal para mantener un buen control del azúcar. Asegúrate de tener proporciones equilibradas de carbohidratos, proteínas y grasas saludables.",
                "Una dieta equilibrada te ayudará a mantener el control del azúcar. Incluye grasas saludables, proteínas magras y carbohidratos complejos."
            ];
        } else {
            consejos = [
                "Para controlar el azúcar, intenta reducir los azúcares añadidos y consumir alimentos ricos en fibra.",
                "Controlar los niveles de azúcar requiere evitar los azúcares procesados y consumir alimentos naturales como frutas y verduras."
            ];
        }

        // Seleccionar un nuevo consejo que no sea el último proporcionado
        let nuevoConsejo;
        do {
            nuevoConsejo = Math.floor(Math.random() * consejos.length);
        } while (nuevoConsejo === ultimoConsejo);

        // Guardar el nuevo consejo en los atributos de la sesión
        sessionAttributes.ultimoConsejo = nuevoConsejo;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        // Generar la respuesta con el consejo seleccionado
        speechText = consejos[nuevoConsejo];

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `GlucoGuru te proporciona la información y el apoyo que necesitas para vivir una vida saludable con diabetes.
        ¿Quieres probarlo? Simplemente di: "Qué alimentos debo evitar si tengo: tu tipo de diabetes" y GlucoGuru te dará una sugerencia personalizada.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Hasta luego!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        QueAlimentosEvitarHandler,
        ComoEquilibrarComidasHandler,
        ConsejoNutricionalHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();