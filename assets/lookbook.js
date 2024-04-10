document.addEventListener('click', function(event) {
  if (event.target.classList.contains('product__button-buy')) {
      const addToCartButton = event.target;
      const form = addToCartButton.closest('.product__form');
      const cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');

      if (form && cart) {
          const formData = new FormData(form);
          formData.append(
              'sections',
              cart.getSectionsToRender().map((section) => section.id)
          );

          fetch(window.Shopify.routes.root + 'cart/add.js', {
              method: 'POST',
              body: formData
          })
          .then(response => response.json())
          .then(response => {
              cart.renderContents(response);
          })
          .catch(error => {
              console.error('Error adding product to cart:', error);
          }); 
      }
  }
});