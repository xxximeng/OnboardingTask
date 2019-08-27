using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnboardingTask.Model
{
    public partial class Store
    {
        public Store()
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

        [InverseProperty("Store")]
        public virtual ICollection<Sale> Sale { get; set; }
    }
}
