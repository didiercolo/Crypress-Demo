describe('Smoke tests', () => {
  context('Login Functionality', () => {
    it('Login using invalid credentials', () => {
      cy.visit('/')
      cy.contains('Form Authentication').click()
      cy.get('#username').type('username')
      cy.get('#password').type(`test {enter}`)
      cy.get('#flash').should('contain', 'Your username is invalid!')
    })

    it('Login using valid credentials', () => {
      cy.visit('/')
      cy.contains('Form Authentication').click()
      cy.get('#username').type('tomsmith')
      cy.get('#password').type(`SuperSecretPassword!{enter}`)
      cy.url().should('include', '/secure')
      cy.get('#flash').should('contain', 'You logged into a secure area!')
      cy.get('a[href="/logout"]').should('be.visible')
    })
    
    it('Login using valid credentials without UI', () => {
      cy.visit('/')
      cy.contains('Form Authentication').click()

      cy.request({
        method: 'POST',
        url: '/authenticate', // baseUrl will be prepended to this url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
          username: 'tomsmith',
          password: 'SuperSecretPassword!'
        }
      })

    
      cy.visit('/secure')
      cy.url().should('include', '/secure')
      cy.get('a[href="/logout"]').should('be.visible')
    })

  })
})
