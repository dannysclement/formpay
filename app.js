document.getElementById('paymentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const type = document.getElementById('type').value;

  let amount = 0;
  if (type === 'frontend') {
    amount = 6000;
  } else if (type === 'both') {
    amount = 12000;
  } else {
    alert('Please select a type.');
    return;
  }

  const handler = PaystackPop.setup({
    key: 'pk_live_c195ccc0876c000c52a09e2b196007dbe7344bb5',
    email: email,
    amount: amount * 100,
    currency: "NGN",
    ref: 'TX_' + Math.floor((Math.random() * 1000000000) + 1),
    label: "Payment to thechzlne",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name
        },
        {
          display_name: "Service Type",
          variable_name: "service_type",
          value: type
        }
      ]
    },
    callback: function (response) {
      const receiptData = {
        name: name,
        email: email,
        amount: amount,
        ref: response.reference
      };

      // Save receipt to local storage for thankyou page
      localStorage.setItem("receipt", JSON.stringify(receiptData));

      // ✅ Send email here (if you use backend, EmailJS, etc.)

      // Redirect to thank you
      window.location.href = "thankyou.html";
    },
    onClose: function () {
      alert('Transaction was cancelled.');
    }
  });

  handler.openIframe();
});
