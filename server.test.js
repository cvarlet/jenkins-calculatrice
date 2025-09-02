const request = require('supertest');
const app = require('./server');

describe('API Calculatrice', () => {
    describe('GET /', () => {
        test('devrait retourner la page HTML', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.type).toBe('text/html');
        });
    });
    
    describe('POST /api/addition', () => {
        test('devrait calculer l\'addition de deux nombres', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: 5, nombre2: 3 })
                .expect('Content-Type', /json/)
                .expect(200);
            
            expect(response.body).toEqual({ resultat: 8 });
        });
        
        test('devrait calculer l\'addition de nombres décimaux', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: 2.5, nombre2: 3.7 })
                .expect(200);
            
            expect(response.body.resultat).toBeCloseTo(6.2);
        });
        
        test('devrait calculer l\'addition de nombres négatifs', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: -5, nombre2: -3 })
                .expect(200);
            
            expect(response.body).toEqual({ resultat: -8 });
        });
        
        test('devrait accepter des chaînes numériques', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: '10', nombre2: '20' })
                .expect(200);
            
            expect(response.body).toEqual({ resultat: 30 });
        });
        
        test('devrait retourner une erreur 400 si un nombre manque', async () => {
            const response1 = await request(app)
                .post('/api/addition')
                .send({ nombre1: 5 })
                .expect(400);
            
            expect(response1.body).toHaveProperty('erreur');
            expect(response1.body.erreur).toBe('Veuillez fournir deux nombres');
            
            const response2 = await request(app)
                .post('/api/addition')
                .send({ nombre2: 3 })
                .expect(400);
            
            expect(response2.body).toHaveProperty('erreur');
        });
        
        test('devrait retourner une erreur 400 si aucun nombre n\'est fourni', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({})
                .expect(400);
            
            expect(response.body).toHaveProperty('erreur');
            expect(response.body.erreur).toBe('Veuillez fournir deux nombres');
        });
        
        test('devrait retourner une erreur 400 pour des valeurs non numériques', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: 'abc', nombre2: 'def' })
                .expect(400);
            
            expect(response.body).toHaveProperty('erreur');
            expect(response.body.erreur).toBe('Les paramètres doivent être des nombres valides');
        });
        
        test('devrait gérer les valeurs null', async () => {
            const response = await request(app)
                .post('/api/addition')
                .send({ nombre1: null, nombre2: null })
                .expect(400);
            
            expect(response.body).toHaveProperty('erreur');
        });
        
        test('devrait gérer les corps de requête vides', async () => {
            const response = await request(app)
                .post('/api/addition')
                .expect(400);
            
            expect(response.body).toHaveProperty('erreur');
        });
    });
});
