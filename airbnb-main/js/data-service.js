let originalData = [];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();

    // Assuming you want to filter the data and get every 5th item
    originalData = responseData.filter((item, index) => index % 5 === 0);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getOriginalData() {
  return originalData;
}

export { fetchData, getOriginalData };
