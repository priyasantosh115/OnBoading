using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace OnBoardingApp.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        readonly IOnBoardingDbUnitOfWork _OnBoardingDbUnitOfWork;

        public CustomerController(IOnBoardingDbUnitOfWork OnBoardingDbUnitOfWork)
        {
            _OnBoardingDbUnitOfWork = OnBoardingDbUnitOfWork;
        }
        
        [HttpPost]
        public IActionResult Create(Customer customer)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetCustomerRepository().Create(customer);
                if (customer == null)
                {
                    return NotFound("The Sales record couldn't able to add.");
                }
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetCustomer()
        {
            try
            {
                IEnumerable<Customer> customer = _OnBoardingDbUnitOfWork.GetCustomerRepository().GetAll();
                return Ok(customer);
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
               Customer customer = _OnBoardingDbUnitOfWork.GetCustomerRepository().GetById(Id);
                if (customer == null)
                {
                    return NotFound("The Employee record couldn't be found.");
                }
                return Ok(customer);
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
                _OnBoardingDbUnitOfWork.GetCustomerRepository().Delete(Id);
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
        public IActionResult Update(Customer customerChanges)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetCustomerRepository().Update(customerChanges);
                if (customerChanges == null)
                {
                    return NotFound("The Sales record couldn't able to update.");
                }
                return Ok(customerChanges);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }
    }
}