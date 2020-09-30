using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.UnitOfWork;
using CustomerSale.Model;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CustomerSale.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        readonly IOnBoardingDbUnitOfWork _OnBoardingDbUnitOfWork;

        public SalesController(IOnBoardingDbUnitOfWork OnBoardingDbUnitOfWork)
        {
            _OnBoardingDbUnitOfWork = OnBoardingDbUnitOfWork;
        }

        [HttpPost]
        public IActionResult Create(Sales sales)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Create(sales);
                if (sales == null)
                {
                    return NotFound("The Sales record couldn't able to add.");
                }
                return Ok(sales);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetSales()
        {
            try
            {
                SalesResponse salesResponse = new SalesResponse();
                salesResponse.Sales = _OnBoardingDbUnitOfWork.GetSalesRepository().GetAll();
                salesResponse.Customers = _OnBoardingDbUnitOfWork.GetCustomerRepository().GetAll();
                salesResponse.Stores = _OnBoardingDbUnitOfWork.GetStoreRepository().GetAll();
                salesResponse.Products = _OnBoardingDbUnitOfWork.GetProductRepository().GetAll();

                return Ok(salesResponse);
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
                SalesResponse salesResponse = new SalesResponse();
                salesResponse.Sales = _OnBoardingDbUnitOfWork.GetSalesRepository().GetAll();
                salesResponse.Customers = _OnBoardingDbUnitOfWork.GetCustomerRepository().GetAll();
                salesResponse.Stores = _OnBoardingDbUnitOfWork.GetStoreRepository().GetAll();
                salesResponse.Products = _OnBoardingDbUnitOfWork.GetProductRepository().GetAll();
                salesResponse.Sale = _OnBoardingDbUnitOfWork.GetSalesRepository().GetById(Id);

                if (salesResponse == null)
                {
                    return NotFound("The Sales record couldn't be found.");
                }
                return Ok(salesResponse);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Delete(int Id)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Delete(Id);
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
        public IActionResult Update(Sales salesChanges)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Update(salesChanges);
                if (salesChanges == null)
                {
                    return NotFound("The Sales record couldn't able to update.");
                }
                return Ok(salesChanges);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

    }
}