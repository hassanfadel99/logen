const API_URL = "https://script.google.com/macros/s/AKfycbzAj1r0t7JfeVyR1rNHbrqD72hXBgNVaMhgOJkR8yY7kbe12xerCPaJAy7FkMNw34Qo8Q/exec";

document.getElementById("attendanceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const status = document.getElementById("statusMessage");
  status.textContent = "جارٍ طلب الموقع الجغرافي...";

  if (!navigator.geolocation) {
    status.textContent = "الموقع غير مدعوم في هذا الجهاز.";
    status.style.color = "#dc2626";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      const data = {
        name: document.getElementById("fullName").value,
        type: document.getElementById("attendanceType").value,
        note: document.getElementById("note").value,
        lat: position.coords.latitude.toFixed(6),
        lon: position.coords.longitude.toFixed(6)
      };

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.text())
      .then(msg => {
        status.textContent = msg;
        status.style.color = "#16a34a";
      })
      .catch(err => {
        status.textContent = "حدث خطأ أثناء الإرسال.";
        status.style.color = "#dc2626";
      });
    },
    function(error) {
      status.textContent = "يجب السماح بتحديد الموقع لإرسال البيانات.";
      status.style.color = "#dc2626";
    }
  );

});
