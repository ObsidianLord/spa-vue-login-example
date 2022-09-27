import { rest } from 'msw';
import { v4 } from 'uuid';

export default [
  rest.post('/auth', async (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken) {
      // 50% success rate on auth
      if (Math.round(Math.random())) {
        return res(
          ctx.status(200),
          ctx.json({
            accessToken: v4(),
          }),
        );
      }

      return res(
        ctx.status(401),
      );
    }

    return res(
      ctx.status(200),
    );
  }),

  rest.get('/profile', (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken) {
      return res(
        ctx.status(403),
      );
    }

    const timeOptions = {
      timeZone: 'America/Indiana/Petersburg',
      hour: 'numeric',
      minute: 'numeric',
    };

    return res(
      ctx.status(200),
      ctx.json({
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        photo: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/182.jpg',
        dob: '09/21/1989',
        phone: '+1 (812) 423-2442',
        position: 'CTO',
        location: 'Petersburg, ID',
        time: `${(new Date()).toLocaleString([], timeOptions)} (GMT-4)`,
      }),
    );
  }),
];
