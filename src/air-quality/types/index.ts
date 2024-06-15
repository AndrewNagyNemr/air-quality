const getAirQualityResponseExample = {
  status: 'success',
  data: {
    city: 'Paris',
    state: 'Ile-de-France',
    country: 'France',
    location: {
      type: 'Point',
      coordinates: [2.351666, 48.859425],
    },
    current: {
      pollution: {
        ts: '2024-06-15T09:00:00.000Z',
        aqius: 31,
        mainus: 'p2',
        aqicn: 20,
        maincn: 'o3',
      },
      weather: {
        ts: '2024-06-15T09:00:00.000Z',
        tp: 15,
        pr: 1009,
        hu: 61,
        ws: 7.72,
        wd: 230,
        ic: '04d',
      },
    },
  },
};

export type GetAirQualityResponse = typeof getAirQualityResponseExample;
