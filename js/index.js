const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  // prevent the form from submitting and refreshing the page
  event.preventDefault();

  // get the value of the search input
  const searchValue = event.target.querySelector('input[type="text"]').value;

  // make a GET request to the User Search Endpoint, passing in the search query as a URL parameter
  fetch(`https://api.github.com/search/users?q=${searchValue}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // get the list of users from the response data
      const users = data.items;

      // create a new HTML element to hold the user information
      const userList = document.createElement('ul');

      // iterate over the list of users
      for (const user of users) {
        // create a new list item for the current user
        const userItem = document.createElement('li');

        // create an anchor element for the user's profile link
        const userLink = document.createElement('a');
        userLink.setAttribute('href', user.html_url);
        userLink.innerText = user.login;

        // create an image element for the user's avatar
        const userAvatar = document.createElement('img');
        userAvatar.setAttribute('src', user.avatar_url);

        // append the avatar and profile link to the list item
        userItem.appendChild(userAvatar);
        userItem.appendChild(userLink);

        // add an event listener for when the user is clicked on
        userItem.addEventListener('click', () => {
          // make a GET request to the User Repos Endpoint, passing in the username as a URL parameter
          fetch(`https://api.github.com/users/${user.login}/repos`, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              // create a new HTML element to hold the repository information
              const repoList = document.createElement('ul');

              // iterate over the list of repositories
              for (const repo of data) {
                // create a new list item for the current repository
                const repoItem = document.createElement('li');

                // create an anchor element for the repository's URL
                const repoLink = document.createElement('a');
                repoLink.setAttribute('href', repo.html_url);
                repoLink.innerText = repo.name;

                // append the repository link to the list item
                repoItem.appendChild(repoLink);
              }
            }