import {Injectable} from "@nestjs/common";
import {Message} from "../models/Message";
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class QueueSenderService {
    sendMessage = (message: Message) => {
        amqp.connect(process.env.AMQP_URL, (connError, connection) => {
            if (connError) {
                throw connError;
            }
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    throw channelError;
                }
                const QUEUE = process.env.QUEUE_NAME
                channel.assertQueue(QUEUE);

                channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));
                return `Message send ${QUEUE}`;
            })
        })

    }
}
