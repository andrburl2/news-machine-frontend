export const MAIN_API_DATA = {
  url: 'https://api.news-machine.ml',
  headers: {
    'Content-Type': 'application/json'
  },
  path: {
    signup: '/signup',
    signin: '/signin',
    logout: '/logout',
    userData: '/users/me',
    articles: '/articles'
  }
}