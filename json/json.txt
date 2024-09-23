{
    "interactionModel": {
        "languageModel": {
            "invocationName": "prueba betes",
            "intents": [
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "QueAlimentosEvitarIntent",
                    "slots": [
                        {
                            "name": "tipoDiabetes",
                            "type": "TipoDiabetes"
                        }
                    ],
                    "samples": [
                        "Qué alimentos debo evitar si tengo {tipoDiabetes}",
                        "Dime qué alimentos debo evitar con {tipoDiabetes}",
                        "Qué no debo comer con {tipoDiabetes}",
                        "Qué alimentos evitar si tengo {tipoDiabetes}",
                        "Cuáles alimentos debo evitar si tengo {tipoDiabetes}",
                        "Qué debo evitar si tengo diabetes tipo {tipoDiabetes}",
                        "Dime alimentos que no debo comer para {tipoDiabetes}"
                    ]
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "ComoEquilibrarComidasIntent",
                    "slots": [
                        {
                            "name": "tipoComida",
                            "type": ""
                        }
                    ],
                    "samples": [
                        "Cómo hago para equilibrar mi alimentación de {tipoComida}",
                        "Dime cómo equilibrar mi dieta con {tipoComida}",
                        "Cómo equilibro mis comidas con {tipoComida}",
                        "Cómo puedo equilibrar mis comidas de {tipoComida}"
                    ]
                },
                {
                    "name": "ConsejoNutricionalIntent",
                    "slots": [
                        {
                            "name": "enfoqueNutricional",
                            "type": ""
                        }
                    ],
                    "samples": [
                        "Dame un consejo para mi azúcar en {enfoqueNutricional}",
                        "Dime cómo controlar el azúcar con la dieta {enfoqueNutricional}",
                        "Dame un consejo para controlar el azúcar usando {enfoqueNutricional}",
                        "Dame un consejo nutricional para controlar el azúcar con un enfoque {enfoqueNutricional}"
                    ]
                }
            ],
            "types": [
                {
                    "name": "TipoDiabetes",
                    "values": [
                        {
                            "name": {
                                "value": "diabetes tipo 1"
                            }
                        },
                        {
                            "name": {
                                "value": "diabetes tipo 2"
                            }
                        },
                        {
                            "name": {
                                "value": "diabetes gestacional"
                            }
                        }
                    ]
                }
            ]
        }
    }
}