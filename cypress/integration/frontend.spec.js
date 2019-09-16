describe('Browsing the app', function() {
    it('Opens the locally run Angular App', function() {
      cy.visit('/')
    })

    it('Should find the correct search label', function(){
        cy.contains('Search Stock')
    })

    it('Should find a search button', function(){
        cy.get('form').contains('Get Quotes')
    })

})


describe('Getting Data', function(){
    it('Should contain a base portfolio', function(){
      setTimeout(() => {
        cy.get('label').contains('Great Co')
      }, 1000)
        
    })

    it('Should type in a stock and submit the form', function(){
        cy.get('input').type('aapl')
        cy.get('button').click('topRight')
        cy.get('form').submit()
        cy.contains('Apple, Inc.')
    })

})
