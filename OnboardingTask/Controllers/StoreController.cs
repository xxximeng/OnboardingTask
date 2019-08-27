using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnboardingTask.Controllers
{
    public class StoreController : Controller
    {
        StoreDataAccessLayer objStore = new StoreDataAccessLayer();

        [HttpGet]
        [Route("api/Store/Index")]
        public IEnumerable<Store> Index()
        {
            return objStore.GetAllStore();
        }

        [HttpPost]
        [Route("api/Store/Create")]
        public int Create(Store store)
        {
            return objStore.AddStore(store);
        }

        [HttpGet]
        [Route("api/Store/Details/{id}")]
        public Store Details(int id)
        {
            return objStore.GetStoreData(id);
        }

        [HttpPut]
        [Route("api/Store/Edit")]
        public int Edit(Store store)
        {
            return objStore.UpdateStore(store);
        }

        [HttpDelete]
        [Route("api/Store/Delete/{id}")]
        public int Delete(int id)
        {
            return objStore.DeleteStore(id);
        }
    }
}
