// import request from 'supertest';

// import app from '../../../../src/app';
// import SetupDatabase from '../../../fixtures/setup';

// // Test flow:
// // - POST /auth/login (400, no username)
// // - POST /auth/login (400, empty username)
// // - POST /auth/login (400, blank spaces in username)
// // - POST /auth/login (400, password required)

// beforeAll(async() => {
//   await SetupDatabase.dropDatabase();
//   await SetupDatabase.seedAdminFullAccess();
//   await SetupDatabase.seedUserApp();
// });

// describe('POST /auth/login', () => {
//   test('no username (400)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send();

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//   });

//   test('empty username (400)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send({ username: '' });

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//   });

//   test('blank spaces in username (400)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send({ username: '   ' });

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//   });

//   test('without password (400)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send({ username: 'admin@getnada.com' });

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//   });

//   test('empty password (400)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send({ username: 'admin@getnada.com', password: '' });

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//   });

//   test('invalid credentials (401)', async() => {
//     const result = await request(app)
//     .post('/auth/login')
//     .send({ username: 'admin@getnada.com', password: '123' });

//     expect(result.status).toBe(400);
//     expect(result.body).toHaveProperty('error');
//     expect(result.body.error).toBe('Credenciais incorretas.');
//   });
// });
