using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace OnBoardingApp.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly IOnBoardingDbUnitOfWork _OnBoardingDbUnitOfWork;

        public ProductController(IOnBoardingDbUnitOfWork OnBoardingDbUnitOfWork)
        {
            _OnBoardingDbUnitOfWork = OnBoardingDbUnitOfWork;
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetProductRepository().Create(product);
                if (product == null)
                {
                    return NotFound("The Sales record couldn't able to add.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetProduct()
        {
            try
            {
                IEnumerable<Product> product = _OnBoardingDbUnitOfWork.GetProductRepository().GetAll();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetById(int Id)
        {
            try
            {
                Product product = _OnBoardingDbUnitOfWork.GetProductRepository().GetById(Id);
                if (product == null)
                {
                    return NotFound("The Employee record couldn't be found.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpPost("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetProductRepository().Delete(Id);
                if (Id == null)
                {
                    return NotFound("The Sales record couldn't able to delete.");
                }
                return Ok(Id);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Update(Product productChanges)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetProductRepository().Update(productChanges);
                if (productChanges == null)
                {
                    return NotFound("The Sales record couldn't able to update.");
                }
                return Ok(productChanges);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

    }
}