using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using EntityLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
        // Task<Photo> GetPhoto(int photoId);
    }
}