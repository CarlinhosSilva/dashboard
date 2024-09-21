const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
    // Conectar ao banco de dados de teste
    await mongoose.connect(process.env.MONGO_TEST_URI);
    console.log('Conectado ao banco de dados de teste');
});

afterEach(async () => {
    // Limpar todos os dados após cada teste
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    // Desconectar após os testes
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});