const { mocks, addMockImage } = require("./mock");
const url = require("url");
module.exports.placesRequest = (request, response) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock) {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }
  }
  response.json(data);
};