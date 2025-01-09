class ServerAPI {
  constructor(ports) {
    this.ports = ports;
    this.currentPortIndex = 0;
    this.baseUrl = `http://localhost:${this.ports[this.currentPortIndex]}/api/services`;
  }

  async checkPortAvailability(port) {
    try {
      const response = await fetch(`http://localhost:${port}/api/services`);
      return response.ok;
    } catch (error) {
      console.error(`Error while checking port ${port}: ${error}`);
      return false;
    }
  }

  async fetchServices() {
    for (let i = this.currentPortIndex; i < this.ports.length; i++) {
      const port = this.ports[i];
      const isAvailable = await this.checkPortAvailability(port);

      if (isAvailable) {
        this.baseUrl = `http://localhost:${port}/api/services`;
        console.log(`Successfully connected to server on port ${port}`);
        break;
      } else {
        console.log(`Server on port ${port} is not available, trying next one.`);
      }
    }

    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch data from server');

      const services = await response.json();
      console.log('Fetched services:', services);
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      return null;
    }
  }

  async fetchTariffs() {
    try {
      const response = await fetch(`${this.baseUrl.replace('/services', '/tariffs')}`);
      if (!response.ok) throw new Error('Failed to fetch tariffs');

      const tariffs = await response.json();
      console.log('Fetched tariffs:', tariffs);
      return tariffs;
    } catch (error) {
      console.error('Error fetching tariffs:', error);
      return null;
    }
  }
}

function displayTariffs(tariffs) {
  const tariffsContainer = document.getElementById('tariffs-cards');
  const tariffCountElement = document.getElementById('tariffCount');
  tariffsContainer.innerHTML = '';

  if (!tariffs || tariffs.length === 0) {
    tariffsContainer.innerHTML = '<p>No tariffs available.</p>';
    tariffCountElement.innerText = 'ТАРИФИ: 0';
    return;
  }

  tariffCountElement.innerText = `ТАРИФИ: ${tariffs.length}`;

  tariffs.forEach(tariff => {
    const tariffElement = document.createElement('div');
    tariffElement.classList.add('tariff-card');

    tariffElement.innerHTML = `
      <h3>${tariff.name}</h3>
      <p>${tariff.description}</p>
      <p>Price: ${tariff.price} (Old: ${tariff.old_price || 'N/A'})</p>
      <p>Duration: ${tariff.duration} days</p>
      <ul>${tariff.features.split(',').map(feature => `<li>${feature}</li>`).join('')}</ul>
      <img src="${tariff.icon_url}" alt="${tariff.name}" />
    `;

    tariffsContainer.appendChild(tariffElement);
  });
}

const serverAPI = new ServerAPI([3000, 3001, 3002, 3003, 3004, 3005]);

serverAPI.fetchServices().then(services => {
  if (services) displayServices(services);
});

serverAPI.fetchTariffs().then(tariffs => {
  if (tariffs) displayTariffs(tariffs);
});