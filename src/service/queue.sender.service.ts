import {Injectable} from "@nestjs/common";
import {Message} from "../models/Message";

const amqp = require('amqplib/callback_api');
@Injectable()
export class QueueSenderService {
    sendMessage = (message: Message) => {
        amqp.connect('amqp://localhost', (connError, connection) => {
            if (connError) {
                throw connError;
            }
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    throw channelError;
                }
                const QUEUE = 'codingtest'
                channel.assertQueue(QUEUE);

                channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));
                return `Message send ${QUEUE}`;
            })
        })

    }
}
