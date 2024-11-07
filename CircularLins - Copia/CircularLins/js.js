const routes = [
    { number: '01', name: 'CDHU', url: 'https://www.example.com/cdhu' },
    { number: '02', name: 'Parque das Flores', url: 'https://www.example.com/parque-das-flores' },
    { number: '03', name: 'Cohab Chris', url: 'https://www.example.com/cohab-chris' },
    { number: '04', name: 'Junqueira', url: 'https://www.example.com/junqueira' },
    { number: '05', name: 'Paseto', url: 'https://www.example.com/paset' },
    { number: '06', name: 'Xingu', url: 'https://www.example.com/xingu' },
    { number: '07', name: 'Vila Alta', url: 'https://www.example.com/vila-alta' },
  ];
  
  const routesContainer = document.getElementById('routes-container');
  
  routes.forEach(route => {
    const routeElement = document.createElement('div');
    routeElement.classList.add('route');
    routeElement.innerHTML = `
      <div class="route-number">${route.number}</div>
      <div class="route-name">${route.name}</div>
      <a href="${route.url}" class="route-link">Ver mais</a>
    `;
    routesContainer.appendChild(routeElement);
  });