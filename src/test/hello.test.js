const { helloWorldHandler } = require('../functions/HelloWorld');

describe('HelloWorld Function', () => {
    const createMockContext = () => ({
        log: jest.fn()
    });

    it('should return Hello, world! when no name is given', async () => {
        const request = {
            url: 'http://localhost/api/HelloWorld',
            query: new URLSearchParams(), // no name
            text: async () => ''
        };
        const context = createMockContext();

        const response = await helloWorldHandler(request, context);
        expect(response.body).toBe('Hello, world!');
    });

    it('should return Hello, John! when name is in query', async () => {
        const request = {
            url: 'http://localhost/api/HelloWorld',
            query: new URLSearchParams({ name: 'John' }),
            text: async () => ''
        };
        const context = createMockContext();

        const response = await helloWorldHandler(request, context);
        expect(response.body).toBe('Hello, John!');
    });

    it('should return Hello, Jane! when name is in body', async () => {
        const request = {
            url: 'http://localhost/api/HelloWorld',
            query: new URLSearchParams(), // no query param
            text: async () => 'Jane'
        };
        const context = createMockContext();

        const response = await helloWorldHandler(request, context);
        expect(response.body).toBe('Hello, Jane!');
    });
});
