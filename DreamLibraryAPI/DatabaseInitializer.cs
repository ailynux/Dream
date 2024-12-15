using Microsoft.Data.Sqlite;

namespace DreamLibraryAPI
{
    public static class DatabaseInitializer
    {
        public static void InitializeDatabase(string connectionString)
        {
            using var connection = new SqliteConnection(connectionString);
            connection.Open();

            var command = connection.CreateCommand();
            
            // Drop existing tables if they exist
            command.CommandText = @"
                DROP TABLE IF EXISTS Dreams;
                DROP TABLE IF EXISTS Users;
                
                CREATE TABLE Users (
                    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Username TEXT NOT NULL UNIQUE,
                    PasswordHash TEXT NOT NULL
                );

                CREATE TABLE Dreams (
                    DreamId INTEGER PRIMARY KEY AUTOINCREMENT,
                    UserId INTEGER NOT NULL,
                    Title TEXT NOT NULL,
                    Description TEXT NOT NULL,
                    Category TEXT NOT NULL,
                    DreamDate TEXT NOT NULL,
                    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
                );

                -- Insert test user
                INSERT INTO Users (Username, PasswordHash) 
                VALUES ('testuser', 'password');
            ";
            
            command.ExecuteNonQuery();
        }
    }
}