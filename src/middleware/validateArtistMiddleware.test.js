import validateArtistMiddleware, { isValidArtist } from './validateArtistMiddleware';

describe('#isValidArtist', () => {
  it('should return true when body has name property', () => {
    const body = { name: 'Céline Dion' };
    expect(isValidArtist(body)).toEqual(true);
  });

  it('should return false when body is missing name property', () => {
    const body = { age: 35 };
    expect(isValidArtist(body)).toEqual(false);
  });
});

describe('#validateArtistMiddleware', () => {
  it('should call res.status(400) when missing name', () => {
    const req = {
      body: {
        age: 35,
      },
    };
    const res = { status: jest.fn(() => res), send: jest.fn() };
    const next = jest.fn();

    validateArtistMiddleware(req, res, next);

    expect(res.status.mock.calls[0][0]).toEqual(400);
    expect(res.send.mock.calls[0][0]).toEqual('Bad Request - parameters are missing');
    expect(next.mock.calls.length).toEqual(0);
  });

  it('should call next() when name property is set', () => {
    const req = {
      body: {
        name: 'Jason Mraz',
      },
    };
    const res = { };
    const next = jest.fn();

    validateArtistMiddleware(req, res, next);

    expect(next.mock.calls.length).toEqual(1);
  });
});
