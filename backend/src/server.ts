import app from './app';
import sequelize from './config/database';

const PORT = Number(process.env.PORT ?? 3000);

const start = async () => {
  try {
    // Conecta a la BD.
    await sequelize.authenticate();
    // Sincroniza los modelos.
    await sequelize.sync();

    console.log('Base de datos conectada y sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

start();
