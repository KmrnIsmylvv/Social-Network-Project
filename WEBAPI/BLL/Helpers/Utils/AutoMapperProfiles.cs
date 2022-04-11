using System;
using System.Linq;
using AutoMapper;
using BLL.DTOs;
using BLL.Helpers.Extensions;
using EntityLayer.Entities;

namespace BLL.Helpers.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt =>
                    opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt =>
                    opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Comment, CommentDto>()
                .ForMember(k => k.KnownAs, o =>
                    o.MapFrom(src => src.Author.KnownAs))
                .ForMember(u => u.Username, a =>
                    a.MapFrom(src => src.Author.UserName))
                .ForMember(p => p.PhotoUrl, o =>
                    o.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}