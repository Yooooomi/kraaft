import { User, Message } from './types';

interface Store {
  currentUserId: string;
  users: User[];
  messages: Message[];
}

export const store: Store = {
  currentUserId: 'maxime@kraaft.co',
  users: [
    {
      id: 'maxime2@kraaft.co',
      username: 'Maxime',
    },
    {
      id: 'maxime@kraaft.co',
      username: 'Maxime Blanchard',
    },
    {
      id: 'cedric@kraaft.co',
      username: 'Cedric Boidin',
    },
  ],
  messages: [
    {
      id: 'JOyCwtqoK',
      type: 'text',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618056833265,
      content:
        "Did you know @Cedric Boidin that the University of Iowa's locker room is painted pink? I wonder why?",
    },
    {
      id: 'yTFQY-vpSu',
      type: 'text',
      senderId: 'cedric@kraaft.co',
      createdAt: 1618056839996,
      content:
        'I think I did hear something about that. I imagine it is an attempt to psych the other team out.',
    },
    {
      id: '6ZzP46ndf4',
      type: 'image',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618056869148,
      url: 'https://i.imgur.com/s7WucBN.png',
      caption: `So, it would be in the visiting team's locker room but not their own?`,
    },
    {
      id: 'Gee3s5UVi2',
      type: 'image',
      senderId: 'cedric@kraaft.co',
      createdAt: 1618056882696,
      url: 'https://i.imgur.com/WRgTbTg.png',
      caption: `Right @Maxime. Teams do all kinds of things to bother the competition. I've heard of teams having heated benches in the winter for themselves but not for the visitors.`,
    },
    {
      id: '6Fyn5NwJeA',
      type: 'text',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618056893845,
      content: `I would hate a cold bench. Then again, I wouldn't want to be some place that cold or watching football.`,
    },
    {
      id: 'sPJVnJGjHX',
      type: 'image',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618056917999,
      url: 'https://i.imgur.com/9OAvz8R.png',
      caption: `I'd rather watch it inside where it's warm. @Cedric Boidin Have you heard about the Georgia Tech-Cumberland game of 1916?`,
    },
    {
      id: 'IHf9wxvqUV',
      type: 'text',
      senderId: 'cedric@kraaft.co',
      createdAt: 1618056927368,
      content: 'No, what happened in that game?',
    },
    {
      id: '8ZDFgmLsYW',
      type: 'image',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618056949966,
      url: 'https://i.imgur.com/wVLumym.jpg',
      caption: `Georgia Tech defeated Cumberland but here's the thing, they defeated them by a score of 222-0!`,
    },
    {
      id: '_IaJIIhFyN',
      type: 'image',
      senderId: 'cedric@kraaft.co',
      createdAt: 1618056972544,
      url: 'https://i.imgur.com/RHqQW9F.png',
      caption: 'That is insane. How could that even happen?',
    },
    {
      id: '5HMCClTDka',
      type: 'text',
      senderId: 'maxime@kraaft.co',
      createdAt: 1618057001918,
      content: `I don't know but it did.  It's the highest scoring game in history.`,
    },
  ],
};
