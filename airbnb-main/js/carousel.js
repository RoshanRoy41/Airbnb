function updateCarouselContent(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
  
    items.forEach((item) => {
      const element = document.createElement('div');
      element.classList.add('d-flex', 'flex-column', 'align-items-center');
      element.innerHTML = `
        <i class="fa-solid ${item.icon}"></i>
        <p>${item.label}</p>
      `;
      container.appendChild(element);
    });
  }
  
  //  Data for the next and previous sets of items
  const nextSetOfItems = [
    { icon: 'fa-house-chimney', label: 'House' },
    { icon: 'fa-snowflake', label: 'Arctic' },
    { icon: 'fa-tree', label: 'Forest' },
    { icon: 'fa-building', label: 'City' },
  ];
  
  const previousSetOfItems = [
    { icon: 'fa-campground', label: 'Camping' },
    { icon: 'fa-umbrella-beach', label: 'Beach' },
    { icon: 'fa-rocket', label: 'OMG' },
    { icon: 'fa-volleyball', label: 'Games' },
  ];
  
  // Handle carousel slide events
  $('#sortBarCarousel').on('slide.bs.carousel', function (event) {
    const direction = event.direction;
  
    // Modify the content based on the slide direction
    if (direction === 'left') {
      // Update content for the next set of items
      console.log(direction);
      updateCarouselContent(nextSetOfItems, 'carouselContent1');
    } else if (direction === 'right') {
      // Update content for the previous set of items
      updateCarouselContent(previousSetOfItems, 'carouselContent2');
    }
  });