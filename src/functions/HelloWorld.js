const { app } = require('@azure/functions');

const helloWorldHandler = async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const name = request.query.get('name') || await request.text() || 'world';
    return { body: `Hello, ${name}!` };
};

app.http('HelloWorld', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: helloWorldHandler
});

// 👇 Export for testing
module.exports = { helloWorldHandler };
