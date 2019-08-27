using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OnboardingTask.Model
{
    public class StoreDataAccessLayer
    {
        OnboardingTaskDbContext db = new OnboardingTaskDbContext();

        public IEnumerable<Store> GetAllStore()
        {
            try
            {
                return db.Store.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new store record     
        public int AddStore(Store store)
        {
            try
            {
                db.Store.Add(store);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar store    
        public int UpdateStore(Store store)
        {
            try
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular store    
        public Store GetStoreData(int id)
        {
            try
            {
                Store store = db.Store.Find(id);
                return store;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular store    
        public int DeleteStore(int id)
        {
            try
            {
                Store sto = db.Store.Find(id);
                db.Store.Remove(sto);
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
