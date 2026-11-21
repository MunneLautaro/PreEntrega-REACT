# PreEntrega React

Monorepo con dos proyectos independientes, cada uno con su propio `package.json`, para poder deployarlos por separado.

```
frontend/   React + Vite
backend/    API REST con Express + Mongoose + Yup
```

## Backend

```bash
cd backend
cp .env.example .env   # completar MONGODB_URI y CORS_ORIGIN
npm install
npm run seed
npm run dev
```

Estructura por capas:

```
src/
  config/        env, conexión a MongoDB, opciones de CORS
  models/        schemas de Mongoose
  validations/   schemas de Yup (body de las peticiones)
  services/      lógica de negocio y acceso a datos
  controllers/   reciben req/res y llaman a los services
  routes/        endpoints + middlewares de cada ruta
  middlewares/   validate (Yup), validateObjectId, notFound, errorHandler
  utils/         HttpError
  app.js         configuración de Express
  index.js       conexión a la DB y arranque del servidor
```

Endpoints (`/api`):

| Método | Ruta                   | Descripción                                            |
| ------ | ---------------------- | ------------------------------------------------------ |
| GET    | `/health`              | Estado del servidor y de la DB                         |
| GET    | `/products`            | Listar productos (opcional: `?category=Vientos`)       |
| GET    | `/products/categories` | Categorías con productos (`?withCount=true`: con cantidad) |
| GET    | `/products/:id`        | Obtener un producto                                    |
| POST   | `/products`            | Crear producto                                         |
| PUT    | `/products/:id`        | Reemplazar producto (todos los campos)                 |
| PATCH  | `/products/:id`        | Actualizar campos de un producto                       |
| DELETE | `/products/:id`        | Eliminar producto                                      |
| \*     | `/team[/:id]`          | Mismas operaciones para la colección `equipo` (footer) |
| GET    | `/coupons`             | Listar cupones de descuento (colección `cupones`)      |
| POST   | `/coupons`             | Crear cupón (`codigo`, `porcentaje` 1-100)             |
| DELETE | `/coupons/:id`         | Eliminar cupón                                         |

Respuestas: `{ ok: true, data }` si sale bien, `{ ok: false, message, details? }` si hay error.

Paginación: `GET /products` y `GET /coupons` aceptan `?page=1&limit=10` (`limit` máximo 50). Si se manda alguno de los dos, la respuesta suma `pagination: { page, limit, total, totalPages }`; sin ellos se devuelve la lista completa.

Producto: `name`, `category`, `price`, `stock`, `image` y `description` (opcional). Las categorías válidas están en [`backend/src/constants/categories.js`](backend/src/constants/categories.js).

Para probar la API hay una colección de Postman en [`backend/postman/`](backend/postman/).

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

## Deploy

- **Backend** (Render, Railway, etc.): root directory `backend`, build `npm install`, start `npm start`. Variables: `MONGODB_URI`, `CORS_ORIGIN` (URL del frontend deployado), `NODE_ENV=production`.
- **Frontend** (Vercel, Netlify, etc.): root directory `frontend`, build `npm run build`, output `dist`. Variables: `VITE_API_URL`, `VITE_IMGBB_API_KEY`.
