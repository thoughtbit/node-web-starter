import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AppService } from './app.service';

@Resolver('App')
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly pubSub: PubSub,
  ) { }

  @Query('sayHello')
  async sayHello(@Args() args: { name: string }) {
    console.log('sayHello:', args);
    return this.appService.sayHello(args.name);
  }

  @Mutation('pubMessage')
  async sayHi(@Args('msg') args: string) {
    this.pubSub.publish('subMessage', { subMessage: `msg: ${args}` });
    return `msg: ${args}`;
  }

  @Subscription('subMessage')
  subMessage() {
    return {
      subscribe: () => this.pubSub.asyncIterator('subMessage')
    };
  }
}