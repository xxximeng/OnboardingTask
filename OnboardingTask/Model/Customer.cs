using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnboardingTask.Model
{
    public partial class Customer
    {
        public Customer()
        {
            Sale = new HashSet<Sale>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Address { get; set; }

        [InverseProperty("Customer")]
        public virtual ICollection<Sale> Sale { get; set; }
    }
}
