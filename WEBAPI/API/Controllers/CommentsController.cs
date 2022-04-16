// using System.Linq;
// using System.Threading.Tasks;
// using AutoMapper;
// using BLL.DTOs;
// using BLL.Helpers.Extensions;
// using BLL.Interfaces;
// using EntityLayer.Entities;
// using Microsoft.AspNetCore.Mvc;
//
// namespace API.Controllers
// {
//     public class CommentsController : BaseApiController
//     {
//         private readonly IUnitOfWork _unitOfWork;
//         private readonly IMapper _mapper;
//
//         public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
//         {
//             _unitOfWork = unitOfWork;
//             _mapper = mapper;
//         }
//
//         public async Task<ActionResult<CommentDto>> Create(int photoId, CommentDto commentDto)
//         {
//             var user = await _unitOfWork.UserRepository.GetUserByUsername(commentDto.Username);
//
//             var author = await _unitOfWork.UserRepository.GetUserByUsername(User.GetUsername());
//
//             var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
//
//             if (photo == null) return null;
//
//             var comment = new Comment
//             {
//                 Author = author,
//                 Photo = photo,
//                 Body = commentDto.Body
//             };
//             
//             // _unitOfWork.CommentRepository.CreateComment(comment);
//
//             photo.Comments.Add(comment);
//             
//             if (await _unitOfWork.Complete()) return _mapper.Map<CommentDto>(comment);
//
//             return BadRequest("Failed to add comment");
//         }
//     }
// }