using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnboardingTask.Controllers
{
    public class ProductController : Controller
    {
        ProductDataAccessLayer objProduct = new ProductDataAccessLayer();

        [HttpGet]
        [Route("api/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return objProduct.GetAllProduct();
        }

        [HttpPost]
        [Route("api/Product/Create")]
        public int Create(Product product)
        {
            return objProduct.AddProduct(product);
        }

        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public Product Details(int id)
        {
            return objProduct.GetProductData(id);
        }

        [HttpPut]
        [Route("api/Product/Edit")]
        public int Edit(Product product)
        {
            return objProduct.UpdateProduct(product);
        }

        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return objProduct.DeleteProduct(id);
        }
    }
}
