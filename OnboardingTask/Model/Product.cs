using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnboardingTask.Model
{
    public partial class Product
    {
        public Product()
        {
            Sale = new HashSet<Sale>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        [InverseProperty("Product")]
        public virtual ICollection<Sale> Sale { get; set; }
    }
}
