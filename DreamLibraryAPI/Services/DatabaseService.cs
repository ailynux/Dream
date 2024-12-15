using Microsoft.Data.Sqlite;
using System.Data;

namespace DreamLibraryAPI.Services
{
    public class DatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException(nameof(configuration));
        }

        public IDbConnection GetConnection() => new SqliteConnection(_connectionString);
    }
}