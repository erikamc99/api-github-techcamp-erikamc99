let APIURL = 'https://api.github.com/users/'

let form = document.getElementById('form');
let search = document.getElementById('search');
let main = document.getElementById('main');

let getUser = async (username) => {
    try {
        let response = await axios.get(`${APIURL}${username}`);
        userCard(response.data);
        await getRepos(username);
    } catch (error) {
        cardError(error, 'No profile with this username');
    }
};

let getRepos = async (username) => {
    try {
        let response = await axios.get(`${APIURL}${username}/repos`);
        addRepos(response.data);
    } catch (error) {
        cardError(error, 'No repos found');
    }
};

let userCard = (user) => {
    let createCard = `
    <div class= "card">
        <img src="${user.avatar_url}" alt="user-avatar" class="avatar"/>
        <div class="user-info">
            <h2>${user.name || user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li><strong>${user.followers}</strong>&nbspFollowers</li>
                <li><strong>${user.following}</strong>&nbspFollowing</li>
                <li><strong>${user.public_repos}</strong>&nbspRepos</li>
            </ul>    
            <div class="repo" id="repo"></div>
        </div>
    </div>  
    `;
    main.innerHTML = createCard;
};

let addRepos = (repos) => {
    let cardRepos = document.getElementById('repo');
    cardRepos.innerHTML = '';
    repos.slice(0, 5).forEach((repo) => {
        let repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';
        repoElement.innerText = repo.name;
        cardRepos.appendChild(repoElement);
    });
};

let cardError = (error, defaultMessage) => {
    let message = (error.response && error.response.status === 404)
    ? defaultMessage
    : 'Error 404: Not found';
    let createCardError = `
        <div class="card">
      <h1>${message}</h1>
        </div>
    `;
    main.innerHTML = createCardError;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = search.value.trim();
  if (user) {
    getUser(user);
    search.value = '';
  }
});