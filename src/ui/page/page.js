import React from 'react';
import css from './page.css';

class Page extends React.PureComponent {
  render() {
    return (
      <div className={css.page}>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
