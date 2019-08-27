using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnboardingTask.Model
{
    public partial class Sale
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        [Required]
        [StringLength(50)]
        public string DateSold { get; set; }

        [ForeignKey("CustomerId")]
        [InverseProperty("Sale")]
        public virtual Customer Customer { get; set; }
        [ForeignKey("ProductId")]
        [InverseProperty("Sale")]
        public virtual Product Product { get; set; }
        [ForeignKey("StoreId")]
        [InverseProperty("Sale")]
        public virtual Store Store { get; set; }
    }
}
