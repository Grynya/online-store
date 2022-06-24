import {Injectable} from "@nestjs/common";
import {Message} from "../models/Message";

const amqp = require('amqplib');
const lngDetector = new (require('languagedetect'));

@Injectable()
export class QueueReceiverService {
    private getChannel = () => new Promise((resolve) => {
        amqp.connect('amqp://localhost').then((conn) => {
            conn.createChannel().then((ch) => {
                ch.prefetch(1000).then(() => resolve(ch))
            })
        })
    })
    receiveMessages = () => {
        let messages: String[] = []
        return this.getChannel().then(function getMessage(ch) {
            // @ts-ignore
            return ch.get('codingtest', {noAck: true}).then((msgObj) => {
                if (msgObj) {
                    messages.push(msgObj.content)
                    return getMessage(ch)
                } else {
                    console.log(`Retrieved ${messages.length} messages from codingtest`)
                    return messages
                }
            })
        }).catch((err) => {
            err.consumedMessages = messages
            return Promise.reject(err)
        })
    }
    receiveMessagesSorted = async () => {
        let engMessages: Array<Message> = []
        let ukrMessages: Array<Message> = []
        let messages: string[] = await this.receiveMessages();
        for (let msg of messages) {
            let lang = lngDetector.detect(JSON.parse(msg).message, 1);
            if (lang[0][0]==="english") engMessages.push(JSON.parse(msg))
            else if (lang[0][0]==="ukrainian" || lang[0][0]==="russian")
                ukrMessages.push(JSON.parse(msg))
        }
        return {"eng-messages" : engMessages, "ukr-messages": ukrMessages}
    }
}
