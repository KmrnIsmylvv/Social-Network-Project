using System.Threading.Tasks;
using AutoMapper;
using BLL.Interfaces;
using DAL.Data;
using SQLitePCL;

namespace BLL.Services.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);
        public ILikesRepository LikesRepository => new LikesRepository(_context);
        // public ICommentRepository CommentRepository => new CommentRepository(_context, _mapper);
        public IFollowsRepository FollowsRepository => new FollowsRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}