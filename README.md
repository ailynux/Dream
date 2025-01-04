# Dream Library 🌙✨ - ready for 2025 

A full-stack application for recording and analyzing your dreams, built with ASP.NET Core Web API and React.

## 🚀 Features

- Record and manage personal dream entries
- Track dream patterns and themes
- View dream statistics and analytics
- User authentication and personal dream journals
- Intuitive dashboard interface

## 🏗️ Architecture

### Backend (.NET Core)

```
DreamLibraryAPI/
├── Controllers/
│   ├── UsersController.cs      # User management endpoints
│   └── DreamsController.cs     # Dream-related operations
├── Models/
│   ├── User.cs                 # User entity
│   └── Dream.cs                # Dream entity
├── Repositories/
│   ├── UserRepository.cs       # User data access
│   └── DreamRepository.cs      # Dream data access
├── Services/
│   └── DatabaseService.cs      # Database connection handling
├── DatabaseInitializer.cs      # Initial setup and seeding
├── Program.cs                  # Application entry point
└── appsettings.json           # Configuration
```

### Frontend (React)

```
dream-library/
├── public/
├── src/
│   ├── components/
│   │   ├── DreamDashboard.js   # Main dashboard view
│   │   ├── DreamForm.js        # Dream entry form
│   │   └── DreamStats.js       # Analytics display
│   ├── App.js                  # Root component
│   ├── index.js               # Entry point
│   └── api.js                 # API integration
└── package.json
```

## 🛠️ Technology Stack

### Backend
- ASP.NET Core Web API
- SQLite Database
- Dapper ORM
- Swagger/OpenAPI

### Frontend
- React
- Modern JavaScript (ES6+)
- React Router
- Axios for API calls

## 🚦 Getting Started

### Prerequisites
- .NET 6.0 SDK or later
- Node.js 14.x or later
- npm or yarn
- SQLite

### Backend Setup
1. Navigate to the API directory:
   ```bash
   cd DreamLibraryAPI
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd dream-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## 📝 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Dreams
- `GET /api/dreams` - Get all dreams
- `GET /api/dreams/{id}` - Get dream by ID
- `POST /api/dreams` - Create new dream
- `PUT /api/dreams/{id}` - Update dream
- `DELETE /api/dreams/{id}` - Delete dream

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔮 Future Enhancements

- Dream theme classification using machine learning
- Social features for sharing and discussing dreams
- Advanced analytics and pattern recognition
- Mobile application development
- Integration with sleep tracking devices

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintenance team.

---
Made with ❤️ for dreamers everywhere
