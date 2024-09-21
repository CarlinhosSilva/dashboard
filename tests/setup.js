const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let mongoServer;

beforeAll(async () => {
    // Iniciar o MongoDB em memória
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Conectar ao banco de dados em memória
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Conectado ao banco de dados em memória');
});

afterEach(async () => {
    // Limpar todos os dados após cada teste
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    // Desconectar após os testes e parar o servidor em memória
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('Desconectado do banco de dados em memória');
});
