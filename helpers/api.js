import AsyncStorage from '@react-native-community/async-storage';

const apiUrl = 'https://mobapivagas.jobconvo.com/v1/';

async function getHeaders() {
  const currentToken = await getToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token ' + currentToken,
  };
}
async function getUserId() {
  return await AsyncStorage.getItem('userId');
}

async function getToken() {
  return await AsyncStorage.getItem('userToken');
}

export async function patchuserUpdate(dataInJson) {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: heads,
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

export async function getUserProfile() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/profile/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/profile/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/salary/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/salary/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/resume/exp/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/resume/exp/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: heads,
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
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/list/areas/' + userId + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserAreas(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/add/area/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
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

export async function getUserDisability() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/disability/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function patchUserDisability(dataInJson) {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/disability/' + userId + '/update/';
  return fetch(newUrl, {
    method: 'PATCH',
    headers: heads,
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

export async function postUserEducation(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/add/education/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
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

export async function patchUserEducation(dataInJson, id) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/education/' + id + '/update/';
  return fetch(newUrl, {
    method: 'PUT',
    headers: heads,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function deleteUserEducation(id) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/remove/education/' + id + '/?';
  return fetch(newUrl, {
    method: 'DELETE',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserEducations() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/list/educations/' + userId + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserExperience() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/list/works/' + userId + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserExperience(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/add/work/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
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

export async function patchUserExperience(dataInJson, id) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/work/' + id + '/update/';
  return fetch(newUrl, {
    method: 'PUT',
    headers: heads,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function deleteUserExperience(id) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/remove/work/' + id + '/?';
  return fetch(newUrl, {
    method: 'DELETE',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserLanguages() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/list/languages/' + userId + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserLanguage(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'user/add/language/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
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

export async function deleteUser() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/' + userId + '/delete/?';
  return fetch(newUrl, {
    method: 'DELETE',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getUserJobs() {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'user/list/jobs/applied/' + userId + '/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function getAllJobs() {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'list/jobs/';
  return fetch(newUrl, {
    method: 'GET',
    headers: heads,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserApplyJob(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'job/apply/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
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

export async function postUserRecoverPass(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'rest/password/reset/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserRecoverCode(dataInJson) {
  const heads = await getHeaders();
  const userId = await getUserId();
  const newUrl = apiUrl + 'rest/password/reset/' + userId + '/confirm/code/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}

export async function postUserChangePass(dataInJson) {
  const heads = await getHeaders();
  const newUrl = apiUrl + 'rest/password/reset/MQ/5kk-f3bfad95989e79fc7d51/';
  return fetch(newUrl, {
    method: 'POST',
    headers: heads,
    body: JSON.stringify(dataInJson),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      return [true, responseJson];
    })
    .catch((error) => {
      return [true, error];
    });
}
