export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    
    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    const firstNav = document.querySelector('nav :nth-child(2)')
    const secondNav = document.querySelector('nav :nth-child(3)')
    const thirdNav = document.querySelector('nav :nth-child(4)')

    fetch(route)
      .then(data => data.text())
      .then(html => (document.querySelector('#app').innerHTML = html))

    if (pathname == '/') {
      document.body.style.backgroundImage = "url('./assets/universe1.png')"
      this.toogleClass(firstNav, secondNav, thirdNav)
    } else if (pathname == '/universe') {
      document.body.style.backgroundImage = "url('./assets/universe2.png')"
      this.toogleClass(secondNav, firstNav, thirdNav)
    } else {
      document.body.style.backgroundImage = "url('./assets/universe3.png')"
      this.toogleClass(thirdNav, secondNav, firstNav)
    }
  }

  toogleClass(one, two, tree) {
    one.classList.add('click')
    two.classList.remove('click')
    tree.classList.remove('click')
  }
}