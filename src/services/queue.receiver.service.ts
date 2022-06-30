import {Injectable} from "@nestjs/common";
import {Message} from "../models/Message";
import * as amqp from 'amqplib';
// @ts-ignore
import * as LanguageDetect from 'languagedetect';

@Injectable()
export class QueueReceiverService {
    private getChannel = () => new Promise((resolve) => {
        amqp.connect(process.env.AMQP_URL).then((conn) => {
            conn.createChannel().then((ch) => {
                ch.prefetch(1000).then(() => resolve(ch))
            })
        })
    })
    receiveMessages = () => {
        let messages: String[] = []
        return this.getChannel().then(function getMessage(ch) {
            // @ts-ignore
            return ch.get(process.env.QUEUE_NAME, {noAck: true}).then((msgObj) => {
                if (msgObj) {
                    messages.push(msgObj.content)
                    return getMessage(ch)
                } else {
                    console.log(`Retrieved ${messages.length} messages from `+process.env.QUEUE_NAME)
                    return messages
                }
            })
        }).catch((err) => {
            err.consumedMessages = messages
            return Promise.reject(err)
        })
    }
    receiveMessagesSorted = async () => {
        let lngDetector = new LanguageDetect();

        let engMessages: Array<Message> = []
        let ukrMessages: Array<Message> = []
        let messages: string[] = await this.receiveMessages();
        for (let msg of messages) {
            try {
                let lang = lngDetector.detect(JSON.parse(msg).message, 1);
                if (lang[0][0] === "english") engMessages.push(JSON.parse(msg))
                else if (lang[0][0] === "ukrainian" || lang[0][0] === "russian")
                    ukrMessages.push(JSON.parse(msg))
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return {"eng-messages" : engMessages, "ukr-messages": ukrMessages}
    }
}
