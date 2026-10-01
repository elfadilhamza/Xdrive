// 1. Liste des voitures
var carsData = [
  { name: "Dacia Sandero", category: "Économique", city: "Rabat", price: 300, seats: 5, transmission: "Manuelle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUCRzJT7J5T3kVOwawdPzhSzUlGm6IrkWuiuI4bF9OQ&s=10?auto=format&fit=crop&w=600&q=80" },
  { name: "Renault Clio 5", category: "Économique", city: "Casablanca", price: 300, seats: 5, transmission: "Manuelle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ioaR6vUsXIT9hBzGcdK3NGo-HRJaSCtUTD3XfIZ16g&s=10?auto=format&fit=crop&w=600&q=80" },
  { name: "Range Rover Evoque", category: "Familiale", city: "Rabat", price: 1000, seats: 5, transmission: "Automatique", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
  { name: "Mercedes Classe C", category: "Luxe", city: "Casablanca", price: 1500, seats: 2, transmission: "Automatique", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF390NUX9SKZNerDk06Z9aM8wtkOh4P3Vp0MIPE3rpLg&s=10?auto=format&fit=crop&w=600&q=80" },
  { name: "Audi RS3", category: "Luxe", city: "Casablanca", price: 750, seats: 5, transmission: "Automatique", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80" },
  { name: "Peugeot 208", category: "Économique", city: "Rabat", price: 300, seats: 5, transmission: "Manuelle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZU9Yd--UykwBlnlDfGHxvCLib0UNH8phLhAUo0ohhQ&s=10?auto=format&fit=crop&w=600&q=80" }
];

var selectedCar = "";

// 2. Afficher les voitures
function renderCars(list) {
  var container = document.getElementById('cars-container');
  if (!container) return;

  container.innerHTML = "";

  if (list.length == 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Aucun véhicule trouvé.</p>";
    return;
  }

  for (var i = 0; i < list.length; i++) {
    var car = list[i];
    
    var card = '<div class="car-card">' +
                 '<img src="' + car.image + '" alt="' + car.name + '">' +
                 '<div class="car-details">' +
                   '<h3>' + car.name + '</h3>' +
                   '<div class="car-specs">' +
                     '<span><i class="fa-solid fa-location-dot"></i> ' + car.city + '</span>' +
                     '<span><i class="fa-solid fa-users"></i> ' + car.seats + ' places</span>' +
                     '<span><i class="fa-solid fa-gear"></i> ' + car.transmission + '</span>' +
                   '</div>' +
                   '<div class="car-price">' +
                     '<span class="price">' + car.price + ' DH / jour</span>' +
                     '<button type="button" class="btn btn-primary" onclick="openModal(\'' + car.name + '\')">Réserver</button>' +
                   '</div>' +
                 '</div>' +
               '</div>';

    container.innerHTML += card;
  }
}

// 3. Filtrer par Catégorie
function filterCategory(cat, event) {
  var buttons = document.querySelectorAll('.filter-btn');
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove('active');
  }
  if (event && event.target) {
    event.target.classList.add('active');
  }

  if (cat == 'all') {
    renderCars(carsData);
  } else {
    var filtered = [];
    for (var i = 0; i < carsData.length; i++) {
      if (carsData[i].category == cat) {
        filtered.push(carsData[i]);
      }
    }
    renderCars(filtered);
  }
}

// 4. Filtrer par Ville
function filterCars() {
  var cityElement = document.getElementById('search-location');
  var city = cityElement ? cityElement.value : "";

  if (city == "") {
    renderCars(carsData);
  } else {
    var filtered = [];
    for (var i = 0; i < carsData.length; i++) {
      if (carsData[i].city == city) {
        filtered.push(carsData[i]);
      }
    }
    renderCars(filtered);
  }
}

// 5. Modale
function openModal(carName) {
  selectedCar = carName;
  var titleEl = document.getElementById('modal-car-title');
  var modalEl = document.getElementById('modal');

  if (titleEl) titleEl.innerText = "Réservation : " + carName;
  if (modalEl) modalEl.style.display = 'flex';
}

function closeModal() {
  var modalEl = document.getElementById('modal');
  if (modalEl) modalEl.style.display = 'none';
}

// 6. Envoi WhatsApp
function submitBooking(event) {
  event.preventDefault();

  var nameEl = document.getElementById('user-name');
  var phoneEl = document.getElementById('user-phone');
  var date1El = document.getElementById('start-date');
  var date2El = document.getElementById('end-date');

  var name = nameEl ? nameEl.value : "";
  var phone = phoneEl ? phoneEl.value : "";
  var date1 = date1El ? date1El.value : "";
  var date2 = date2El ? date2El.value : "";

  var msg = "Bonjour SPRINTER CAR, je souhaite réserver un véhicule :%0A" +
            "🚗 *Véhicule :* " + selectedCar + "%0A" +
            "👤 *Nom :* " + name + "%0A" +
            "📞 *Téléphone :* " + phone + "%0A" +
            "📅 *Date début :* " + date1 + "%0A" +
            "📅 *Date fin :* " + date2;

  var link = "https://wa.me/212639760105?text=" + msg;
  window.open(link, '_blank');

  closeModal();
}

// 7. Afficher tout au début
window.onload = function() {
  renderCars(carsData);
};