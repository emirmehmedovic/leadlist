# LeadList - Professional Lead Management System

Profesionalna aplikacija za upravljanje lead-ovima sagrađena sa Node.js, TypeScript, PostgreSQL, i Next.js.

## 🚀 Funkcionalnosti

- **Zaštićen pristup** - JWT autentifikacija i autorizacija
- **Lead management** - Kreiranje, uređivanje, brisanje i praćenje lead-ova
- **Kategorije** - Organizovanje lead-ova po kategorijama
- **Napredna pretraga** - Filtriranje po statusu, prioritetu, kategoriji
- **Dashboard** - Pregled statistika i metrika
- **Responsive design** - Moderni i profesionalni UI
- **Real-time notifikacije** - Toast poruke za feedback

## 🛠 Tehnologije

### Backend
- Node.js sa TypeScript
- Express.js
- PostgreSQL sa Prisma ORM
- JWT autentifikacija
- Bcrypt za hash-ovanje lozinki
- Zod za validaciju
- Rate limiting i security middleware

### Frontend
- Next.js 14 sa TypeScript
- React Query za state management
- Tailwind CSS za styling
- React Hook Form sa Zod validacijom
- Axios za API pozive
- React Hot Toast za notifikacije

## 📦 Instalacija

### Preduslovi
- Node.js (v18 ili noviji)
- PostgreSQL (v13 ili noviji)
- npm ili yarn

### 1. Kloniranje projekta
```bash
git clone <repository-url>
cd leadlist
```

### 2. Instalacija dependency-ja
```bash
# Instaliraj sve dependency-jeve odjednom
npm run install:all

# Ili manualno:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Podešavanje baze podataka

#### Kreiranje PostgreSQL baze
```sql
CREATE DATABASE leadlist_db;
CREATE USER leadlist_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE leadlist_db TO leadlist_user;
```

#### Backend environment variables
Kreiraj `.env` fajl u `backend/` folderu:

```env
# Database
DATABASE_URL="postgresql://leadlist_user:your_password@localhost:5432/leadlist_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

#### Frontend environment variables
Kreiraj `.env.local` fajl u `frontend/` folderu:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Database migracije
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Pokretanje aplikacije

#### Development mode
```bash
# Pokreni backend i frontend odjednom
npm run dev

# Ili pokreni zasebno:
npm run dev:backend  # Backend na portu 3001
npm run dev:frontend # Frontend na portu 3000
```

#### Production build
```bash
npm run build
npm start
```

## 🗄 Database Schema

### Users
- id (string, primary key)
- email (string, unique)
- password (string, hashed)
- name (string)
- role (enum: ADMIN, USER)
- createdAt, updatedAt

### Categories
- id (string, primary key)
- name (string, unique)
- description (string, optional)
- color (string, hex color)
- createdAt, updatedAt

### Leads
- id (string, primary key)
- title (string)
- description (string, optional)
- email (string, optional)
- phone (string, optional)
- company (string, optional)
- status (enum: NEW, CONTACTED, QUALIFIED, PROPOSAL, WON, LOST, FOLLOW_UP)
- priority (enum: LOW, MEDIUM, HIGH, URGENT)
- value (float, optional)
- notes (text, optional) - šta je urađeno sa lead-om
- actions (text, optional)
- categoryId (foreign key)
- userId (foreign key)
- createdAt, updatedAt

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Registracija
- `POST /api/auth/login` - Prijava
- `GET /api/auth/me` - Trenutni korisnik
- `POST /api/auth/verify` - Verifikacija tokena

### Categories
- `GET /api/categories` - Lista kategorija
- `GET /api/categories/:id` - Kategorija po ID
- `POST /api/categories` - Kreiranje kategorije
- `PUT /api/categories/:id` - Uređivanje kategorije
- `DELETE /api/categories/:id` - Brisanje kategorije

### Leads
- `GET /api/leads` - Lista lead-ova (sa filtriranjem)
- `GET /api/leads/:id` - Lead po ID
- `POST /api/leads` - Kreiranje lead-a
- `PUT /api/leads/:id` - Uređivanje lead-a
- `DELETE /api/leads/:id` - Brisanje lead-a
- `GET /api/leads/stats/overview` - Statistike

### Users
- `GET /api/users/profile` - Profil korisnika
- `PUT /api/users/profile` - Uređivanje profila
- `PUT /api/users/change-password` - Promjena lozinke
- `DELETE /api/users/account` - Brisanje računa
- `GET /api/users` - Lista korisnika (admin only)

## 🎨 UI Komponente

### Lead Status Colors
- **NEW** - Plava
- **CONTACTED** - Žuta  
- **QUALIFIED** - Ljubičasta
- **PROPOSAL** - Narandžasta
- **WON** - Zelena
- **LOST** - Crvena
- **FOLLOW_UP** - Siva

### Priority Colors
- **LOW** - Zelena
- **MEDIUM** - Žuta
- **HIGH** - Narandžasta
- **URGENT** - Crvena

## 📱 Stranice

### Public stranice
- `/` - Home (redirect)
- `/login` - Prijava
- `/register` - Registracija

### Protected stranice
- `/dashboard` - Glavni dashboard
- `/leads` - Lista lead-ova
- `/leads/new` - Novi lead
- `/leads/[id]` - Detalji lead-a
- `/categories` - Upravljanje kategorijama
- `/profile` - Korisnički profil

## 🔒 Security Features

- JWT token autentifikacija
- Rate limiting
- CORS podešavanja
- Input validacija (Zod)
- Password hashing (bcrypt)
- SQL injection protection (Prisma)
- XSS protection (Helmet)

## 🚦 Development

### Database management
```bash
# Prisma Studio (GUI za bazu)
cd backend && npm run studio

# Reset baze
cd backend && npx prisma migrate reset

# Nova migracija
cd backend && npx prisma migrate dev --name migration_name
```

### Debugging
- Backend logovi su dostupni u konzoli
- Frontend koristi React DevTools
- Database query logovi u Prisma Studio

## 📈 Proizvodnja

1. Podesi production environment variables
2. Izgradi aplikaciju: `npm run build`
3. Pokreni migracije: `cd backend && npx prisma migrate deploy`
4. Pokreni server: `npm start`

## 🤝 Doprinos

1. Fork projekat
2. Kreiraj feature branch
3. Commit promjene
4. Push na branch
5. Otvori Pull Request

## 📄 Licenca

MIT License - vidi LICENSE fajl za detalje.

---

**Napomene:**
- Promijeni default lozinke u produkciji
- Redovno ažuriraj dependency-jeve
- Testiranje preporučuje se prije puštanja u produkciju 