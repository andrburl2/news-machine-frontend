export class BaseComponent {
  _setHandlers(handlersArray) {
    handlersArray.forEach(handler => {
      const { element, event, handlerFunc } = handler;

      if (Array.isArray(element)) {
        element.forEach(item => {
          item.addEventListener(event, handlerFunc);
        });
      } else {
        element.addEventListener(event, handlerFunc);
      }
    });
  }
}