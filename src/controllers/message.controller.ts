import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import {Message} from "../models/Message";
import {QueueReceiverService} from "../service/queue.receiver.service";
import {QueueSenderService} from "../service/queue.sender.service";

@Controller('messages')
export class MessageController {
  constructor(private readonly queueSenderService: QueueSenderService,
              private readonly queueReceiverService: QueueReceiverService) {}

  @Get()
  getAllMessagesSorted(): Object {
    return this.queueReceiverService.receiveMessagesSorted();
  }
  @Post()
  sendMessage(@Body() message: Message): void {
    return this.queueSenderService.sendMessage(message);
  }
}
