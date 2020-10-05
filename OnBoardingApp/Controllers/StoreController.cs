using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace OnBoardingApp.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        readonly IOnBoardingDbUnitOfWork _OnBoardingDbUnitOfWork;

        public StoreController(IOnBoardingDbUnitOfWork OnBoardingDbUnitOfWork)
        {
            _OnBoardingDbUnitOfWork = OnBoardingDbUnitOfWork;
        }

        [HttpPost]
        public IActionResult Create(Store store)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetStoreRepository().Create(store);
                if (store == null)
                {
                    return NotFound("The Sales record couldn't able to add.");
                }
                return Ok(store);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetStore()
        {
            try
            {
                IEnumerable<Store> store = _OnBoardingDbUnitOfWork.GetStoreRepository().GetAll();
                return Ok(store);
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
                Store store = _OnBoardingDbUnitOfWork.GetStoreRepository().GetById(Id);
                if (store == null)
                {
                    return NotFound("The Employee record couldn't be found.");
                }
                return Ok(store);
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
                _OnBoardingDbUnitOfWork.GetStoreRepository().Delete(Id);
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
        public IActionResult Update(Store storeChanges)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetStoreRepository().Update(storeChanges);
                if (storeChanges == null)
                {
                    return NotFound("The Sales record couldn't able to update.");
                }
                return Ok(storeChanges);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

    }
}