// using System.Linq;
// using BLL.Helpers.Extensions;
// using System.Threading.Tasks;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using BLL.DTOs;
// using BLL.Interfaces;
// using DAL.Data;
// using EntityLayer.Entities;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
//
// namespace BLL.Services.Repositories
// {
//     public class CommentRepository : ICommentRepository
//     {
//         private readonly DataContext _context;
//         private readonly IMapper _mapper;
//         private readonly IUnitOfWork _unitOfWork;
//
//         public CommentRepository(DataContext context, IMapper mapper, IUnitOfWork unitOfWork)
//         {
//             _context = context;
//             _mapper = mapper;
//             _unitOfWork = unitOfWork;
//         }
//
//         public void CreateComment(Comment comment)
//         {
//             _context.Comments.Add(comment);
//         }
//
//         public async Task<CommentDto> GetComment(int photoId)
//         {
//             var comments = await _context.Comments
//                 .Where(x => x.Photo.Id == photoId)
//                 .OrderBy(x => x.CreatedAt)
//                 .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
//                 .ToListAsync();
//
//             return _mapper.Map<CommentDto>(comments);
//         }
//     }
// }