const apiUrl = 'https://mobapivagas.jobconvo.com/v1/';

// Cambiar luego por la variable de estado
const user_info = {
  id: 68,
  username: '11989898941',
  email: '',
  first_name: 'Fabian',
  last_name: 'Urrutia',
  date_joined: '2020-11-09T18:49:56-03:00',
  is_active: true,
  last_login: '2020-11-13T03:06:40.303279-03:00',
  token: {
    api_key: '63ea9f16d61fa6fd9165575d26f15cfe667984e3',
  },
};

// Agregar al call para que no tenga que declarar siempre el header
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Token 63ea9f16d61fa6fd9165575d26f15cfe667984e3',
};

export async function getUserProfile() {
  const newUrl = apiUrl + 'user/profile/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function patchUserProfile(dataInJson) {
  const newUrl = apiUrl + 'user/profile/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserSalary() {
  const newUrl = apiUrl + 'user/salary/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function patchUserSalary(dataInJson) {
  const newUrl = apiUrl + 'user/salary/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserExp() {
  const newUrl = apiUrl + 'user/resume/exp/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function patchUserExp(dataInJson) {
  const newUrl = apiUrl + 'user/resume/exp/' + user_info.id + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserAreas() {
  const newUrl = apiUrl + 'user/list/areas/' + user_info.id + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function patchUserAreas(dataInJson) {
  const newUrl = apiUrl + 'user/list/areas/' + user_info.id + '/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}
