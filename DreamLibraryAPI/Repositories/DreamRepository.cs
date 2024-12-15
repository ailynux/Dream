using Dapper;
using DreamLibraryAPI.Models;
using DreamLibraryAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DreamLibraryAPI.Repositories
{
    public class DreamRepository
    {
        private readonly DatabaseService _dbService;

        public DreamRepository(DatabaseService dbService)
        {
            _dbService = dbService;
        }

        public async Task<IEnumerable<Dream>> GetDreamsByUserId(int userId)
        {
            using var connection = _dbService.GetConnection();
            var sql = "SELECT * FROM Dreams WHERE UserId = @UserId";
            return await connection.QueryAsync<Dream>(sql, new { UserId = userId });
        }

        public async Task AddDream(Dream dream)
        {
            using var connection = _dbService.GetConnection();
            var sql = @"INSERT INTO Dreams (UserId, Title, Description, Category, DreamDate)
                        VALUES (@UserId, @Title, @Description, @Category, @DreamDate)";
            await connection.ExecuteAsync(sql, dream);
        }

        public async Task UpdateDream(Dream dream)
        {
            using var connection = _dbService.GetConnection();
            var sql = @"UPDATE Dreams
                        SET Title = @Title, Description = @Description, Category = @Category, DreamDate = @DreamDate
                        WHERE DreamId = @DreamId";
            await connection.ExecuteAsync(sql, dream);
        }

        public async Task DeleteDream(int dreamId)
        {
            using var connection = _dbService.GetConnection();
            var sql = "DELETE FROM Dreams WHERE DreamId = @DreamId";
            await connection.ExecuteAsync(sql, new { DreamId = dreamId });
        }

        public async Task<bool> UserExists(int userId)
        {
            using var connection = _dbService.GetConnection();
            var sql = "SELECT COUNT(1) FROM Users WHERE UserId = @UserId";
            return await connection.ExecuteScalarAsync<bool>(sql, new { UserId = userId });
        }
    }
}