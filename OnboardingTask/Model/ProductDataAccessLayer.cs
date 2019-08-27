using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OnboardingTask.Model
{
    public class ProductDataAccessLayer
    {
        OnboardingTaskDbContext db = new OnboardingTaskDbContext();

        public IEnumerable<Product> GetAllProduct()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new product record     
        public int AddProduct(Product product)
        {
            try
            {
                db.Product.Add(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar product    
        public int UpdateProduct(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular product    
        public Product GetProductData(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                return product;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular product    
        public int DeleteProduct(int id)
        {
            try
            {
                Product pro = db.Product.Find(id);
                db.Product.Remove(pro);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
