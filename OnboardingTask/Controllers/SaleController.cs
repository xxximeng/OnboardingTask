using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnboardingTask.Controllers
{
    public class SaleController : Controller
    {
        SaleDataAccessLayer objSale = new SaleDataAccessLayer();

        [HttpGet]
        [Route("api/Sale/Index")]
        public IEnumerable<Sale> Index()
        {
            return objSale.GetAllSale();
        }

        [HttpPost]
        [Route("api/Sale/Create")]
        public int Create(Sale sale)
        {
            return objSale.AddSale(sale);
        }

        [HttpGet]
        [Route("api/Sale/Details/{id}")]
        public Sale Details(int id)
        {
            return objSale.GetSaleData(id);
        }

        [HttpPut]
        [Route("api/Sale/Edit")]
        public int Edit(Sale sale)
        {
            return objSale.UpdateSale(sale);
        }

        [HttpDelete]
        [Route("api/Sale/Delete/{id}")]
        public int Delete(int id)
        {
            return objSale.DeleteSale(id);
        }

        [HttpGet]
        [Route("api/Customer/GetCustomerList")]
        public IEnumerable<Customer> CustomerDetail()
        {
            return objSale.GetCustomer();
        }

        [HttpGet]
        [Route("api/Product/GetProductList")]
        public IEnumerable<Product> ProductDetail()
        {
            return objSale.GetProduct();
        }

        [HttpGet]
        [Route("api/Store/GetStoreList")]
        public IEnumerable<Store> StoreDetail()
        {
            return objSale.GetStore();
        }
    }
}
