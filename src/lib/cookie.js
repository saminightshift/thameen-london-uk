import { Cookie } from '@shopify/hydrogen';

let cookie = new Cookie('__session', {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30,
});

cookie.parse(request.headers.get('cookie'));
cookie.set('new', 'data');
response.headers.set('Set-Cookie', cookie.serialize());
