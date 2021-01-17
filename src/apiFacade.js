import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = (role) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const addDog = (dog) => {
    const options = makeOptions("POST", true, dog); 
    return fetch(URL + "/api/dog/add", options).then(handleHttpErrors);
  }

  const editDog = (dog) => {
    const options = makeOptions("PUT", true, dog); 
    console.log(dog.id)
    return fetch(URL + "/api/dog/edit", options).then(handleHttpErrors);
  }
  const deleteDog = (id) => {
    const options = makeOptions("DELETE", true); 
    return fetch(URL + "/api/dog/delete/" + id, options).then(handleHttpErrors);
  }

  const fetchUserDogs = () => {
    const options = makeOptions("GET", true); 
    return fetch(URL + "/api/dog/mydogs", options).then(handleHttpErrors);
  }

  const fetchBreeds = () => {
    const options = makeOptions("GET"); 
    return fetch(URL + "/api/dog/breeds", options).then(handleHttpErrors);
  }
  
  const fetchBreedDetails = (breed) => {
    const options = makeOptions("GET"); 
    return fetch(URL + "/api/dog/breeds/" + breed, options).then(handleHttpErrors);
  }

  const fetchAllSearchcount = () => {
    const options = makeOptions("GET", true); 
    return fetch(URL + "/api/info/admin/searches", options).then(handleHttpErrors);
  }

  const fetchAllSearchByBreed = (breed) => {
    const options = makeOptions("GET", true); 
    return fetch(URL + "/api/info/admin/searches/"+breed, options).then(handleHttpErrors);
  }

  const fetchAllSearches = () => {
    const options = makeOptions("GET", true); 
    return fetch(URL + "/api/info/admin/allsearches/", options).then(handleHttpErrors);
  }
  
  

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {  
    
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    addDog,
    editDog,
    deleteDog,
    fetchUserDogs,
    fetchBreeds,
    fetchBreedDetails,
    fetchAllSearchcount,
    fetchAllSearchByBreed,
    fetchAllSearches
  };
}
const facade = apiFacade();
export default facade;
