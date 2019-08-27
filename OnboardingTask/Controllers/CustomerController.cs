using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnboardingTask.Controllers
{
    public class CustomerController : Controller
    {
        CustomerDataAccessLayer objCustomer = new CustomerDataAccessLayer();

        [HttpGet]
        [Route("api/Customer/Index")]
        public IEnumerable<Customer> Index()
        {
            return objCustomer.GetAllCustomer();
        }

        [HttpPost]
        [Route("api/Customer/Create")]
        public int Create(Customer customer)
        {
            return objCustomer.AddCustomer(customer);
        }

        [HttpGet]
        [Route("api/Customer/Details/{id}")]
        public Customer Details(int id)
        {
            return objCustomer.GetCustomerData(id);
        }

        [HttpPut]
        [Route("api/Customer/Edit")]
        public int Edit(Customer customer)
        {
            return objCustomer.UpdateCustomer(customer);
        }

        [HttpDelete]
        [Route("api/Customer/Delete/{id}")]
        public int Delete(int id)
        {
            return objCustomer.DeleteCustomer(id);
        }
    }
}
