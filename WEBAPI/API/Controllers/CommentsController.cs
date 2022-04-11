using System.Threading.Tasks;
using AutoMapper;
using BLL.DTOs;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace API.Controllers
{
    public class CommentsController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

       
    }
}