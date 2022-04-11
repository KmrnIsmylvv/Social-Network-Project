using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.DTOs;
using BLL.Interfaces;
using DAL.Data;
using EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CommentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.FindAsync(id);
        }
        
    }
}