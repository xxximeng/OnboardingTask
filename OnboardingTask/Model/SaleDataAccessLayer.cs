using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OnboardingTask.Model
{
    public class SaleDataAccessLayer
    {
        OnboardingTaskDbContext db = new OnboardingTaskDbContext();

        public IEnumerable<Sale> GetAllSale()
        {
            try
            {
                return db.Sale.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new sale record     
        public int AddSale(Sale sale)
        {
            try
            {
                db.Sale.Add(sale);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar sale    
        public int UpdateSale(Sale sale)
        {
            try
            {
                db.Entry(sale).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular sale    
        public Sale GetSaleData(int id)
        {
            try
            {
                Sale sale = db.Sale.Find(id);
                return sale;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular sale    
        public int DeleteSale(int id)
        {
            try
            {
                Sale sal = db.Sale.Find(id);
                db.Sale.Remove(sal);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Get the list of Customer
        public List<Customer> GetCustomer()
        {
            List<Customer> customerList = new List<Customer>();
            customerList = (from data in db.Customer select data).ToList();
            return customerList;
        }

        //To Get the list of Product
        public List<Product> GetProduct()
        {
            List<Product> productList = new List<Product>();
            productList = (from data in db.Product select data).ToList();
            return productList;
        }

        //To Get the list of Store
        public List<Store> GetStore()
        {
            List<Store> storeList = new List<Store>();
            storeList = (from data in db.Store select data).ToList();
            return storeList;
        }
    }
}
