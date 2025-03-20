document.addEventListener("DOMContentLoaded", function() {
  let totalAmount = 0; // Total price variable
  
  
    const menuIcon = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('open');
    });

  // Treatment Selection
  const treatments = [
    { name: "Yoga", icon: "fa-spa" },
    { name: "All Types of Joint Pain", icon: "fa-bone"},
    { name: "Arthritis", icon: "fa-hand-holding-medical" },
    { name: "Skin Disease", icon: "fa-allergies" },
    { name: "Hyper Acidity", icon: "fas fa-pray" },
    { name: "Piles", icon: "fa-toilet"},
    { name: "Heart Disease", icon: "fa-heart-pulse" },
    { name: "Thinness", icon: "fa-weight" },
    { name: "Obesity", icon: "fa-weight-scale" },
    { name: "Urinary Disorder", icon: "fa-restroom"},
    { name: "Beauty Care Treatment", icon: "fa-spa" },
    { name: "All Chronic Disease", icon: "fa-notes-medical"}
  ];
  
  const treatmentsContainer = document.querySelector(".treatments-grid");
  const selectedList = document.getElementById("selected-treatments-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  
  // Generate Treatment Cards
  treatments.forEach(treatment => {
    const card = document.createElement("div");
    card.classList.add("treatment-card");
    card.innerHTML = `
            <i class="fas ${treatment.icon}"></i>
            <h3>${treatment.name}</h3>
         
        `;
    treatmentsContainer.appendChild(card);
  });
  
  function updateTotal(amount) {
    totalAmount += amount;
    totalAmountDisplay.textContent = `₹${totalAmount}`;
    document.getElementById("payment-amount").textContent = `₹${totalAmount}`;
  }
  
  treatmentsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("select-treatment")) {
      let name = e.target.dataset.name;
      let price = parseInt(e.target.dataset.price);
      
      let listItem = document.createElement("li");
      listItem.innerHTML = `${name} - ₹${price} <button class="remove-treatment">Remove</button>`;
      selectedList.appendChild(listItem);
      
      updateTotal(price);
      
      listItem.querySelector(".remove-treatment").addEventListener("click", function() {
        listItem.remove();
        updateTotal(-price);
      });
    }
  });
  
  // Appointment Form Validation
  const appointmentForm = document.getElementById("appointment-form");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let date = document.getElementById("date").value.trim();
      let message = document.getElementById("message").value.trim();
      
      if (!name || !email || !phone || !date || !message) {
        alert("Please fill in all fields.");
        return;
      }
      
      if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      
      alert("Appointment request submitted successfully!");
      appointmentForm.reset();
    });
  }
  
  // Payment Modal
  const paymentButton = document.getElementById("proceed-payment");
  const paymentModal = document.getElementById("payment-modal");
  const closeModal = document.getElementById("close-modal");
  
  function generateUPIQR() {
    if (totalAmount <= 0) {
      alert("Please select treatments before proceeding to payment.");
      return;
    }
    
    const upiID = "7385236603@fam";
    const upiLink = `upi://pay?pa=${upiID}&pn=Aarogyam%20Nature%20Cure&tn=Payment%20for%20Treatments&am=${totalAmount}&cu=INR`;
    
    const qrContainer = document.getElementById("qr-code-container");
    qrContainer.innerHTML = "";
    let qrImage = document.createElement("img");
    qrImage.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(upiLink)}`;
    qrContainer.appendChild(qrImage);
    
    document.getElementById("payment-amount").textContent = `₹${totalAmount}`;
    paymentModal.style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
  
  if (paymentButton && paymentModal) {
    paymentButton.addEventListener("click", generateUPIQR);
    
    document.getElementById("payment-complete").addEventListener("click", function() {
      alert("Payment successful! Your appointment is confirmed.");
      paymentModal.style.display = "none";
      document.getElementById("overlay").style.display = "none";
    });
    
    closeModal.addEventListener("click", function() {
      paymentModal.style.display = "none";
      document.getElementById("overlay").style.display = "none";
    });
    
    window.addEventListener("click", function(event) {
      if (event.target === document.getElementById("overlay")) {
        paymentModal.style.display = "none";
        document.getElementById("overlay").style.display = "none";
      }
    });
  }
});