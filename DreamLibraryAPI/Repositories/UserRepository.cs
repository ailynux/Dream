using Dapper;
using DreamLibraryAPI.Models;
using DreamLibraryAPI.Services;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DreamLibraryAPI.Repositories
{
    public class UserRepository
    {
        private readonly DatabaseService _dbService;

        public UserRepository(DatabaseService dbService)
        {
            _dbService = dbService;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            using var connection = _dbService.GetConnection();
            var sql = "SELECT * FROM Users";
            return await connection.QueryAsync<User>(sql);
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            using var connection = _dbService.GetConnection();
            var sql = "SELECT * FROM Users WHERE Username = @Username";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
        }

        public async Task AddUser(User user)
        {
            try
            {
                using var connection = _dbService.GetConnection();
                user.PasswordHash = HashPassword(user.PasswordHash); // Hash the password
                var sql = "INSERT INTO Users (Username, PasswordHash) VALUES (@Username, @PasswordHash)";
                await connection.ExecuteAsync(sql, user);
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework)
                Console.WriteLine($"Error adding user: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateUser(User user)
        {
            try
            {
                using var connection = _dbService.GetConnection();
                var sql = "UPDATE Users SET Username = @Username, PasswordHash = @PasswordHash WHERE UserId = @UserId";
                await connection.ExecuteAsync(sql, user);
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework)
                Console.WriteLine($"Error updating user: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteUser(int userId)
        {
            try
            {
                using var connection = _dbService.GetConnection();
                var sql = "DELETE FROM Users WHERE UserId = @UserId";
                await connection.ExecuteAsync(sql, new { UserId = userId });
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework)
                Console.WriteLine($"Error deleting user: {ex.Message}");
                throw;
            }
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var builder = new StringBuilder();
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}