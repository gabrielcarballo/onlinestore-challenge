import React, { Component } from 'react';

export default class HomePage extends Component {
  state = {
    haveContent: false,
  };

  render() {
    const { haveContent } = this.state;
    return (
      <div>
        {(
          haveContent
            ? <p>Se quiseres conecer</p>
            : (
              <h1 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
            )
        )}
      </div>
    );
  }
}
