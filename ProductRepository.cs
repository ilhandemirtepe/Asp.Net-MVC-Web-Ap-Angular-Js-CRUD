using MvcWebApiAngularJs.Interface;
using MvcWebApiAngularJs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWebApiAngularJs.Repositories
{

    public class ProductRepository : IProductRepository
    {
        MvcWebApiAngularJsEntities ProductDB = new MvcWebApiAngularJsEntities();

        public IEnumerable<TblProductList> GetAll()
        {
            //DB den tum ürünleri listele
            return ProductDB.TblProductList;
        }

        public TblProductList Get(int id)
        {
            //DB den verilen id ye göre veri çek
            return ProductDB.TblProductList.Find(id);
        }

        public TblProductList Add(TblProductList item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            //Veri kaydet 
            ProductDB.TblProductList.Add(item);
            ProductDB.SaveChanges();
            return item;
        }

        public bool Update(TblProductList item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            //veri güncelle
            var products = ProductDB.TblProductList.Single(a => a.Id == item.Id);
            products.Name = item.Name;

            products.Price = item.Price;
            ProductDB.SaveChanges();

            return true;
        }

        public bool Delete(int id)
        {
            // veri sil
            TblProductList products = ProductDB.TblProductList.Find(id);
            ProductDB.TblProductList.Remove(products);
            ProductDB.SaveChanges();
            return true;
        }
    }
}
