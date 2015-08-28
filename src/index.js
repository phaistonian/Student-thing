import './index.styl';

import React, { Component } from 'react';

const categories = {
  videos: {
    title: 'video games',
    subs: ['xbox', 'ps4']
  },
  appliances: {
    title: 'Cooking stuff',
    subs: {
      cookers: {
        min: 0,
        max: 100
      },
      something: {
        min: 200,
        max: 500
      }
    }
  },
  phones: {
    title: 'phones and stuff',
    subs: ['cell phones', 'cases']
  }
};


class App extends Component {
  constructor () {
    super();

    this.state = {
      selectedCategory: null
    };
  }

  onChange (selectedCategory) {
    console.log(selectedCategory);
    this.setState({
      selectedCategory
    });
  }

  render () {
    return (
      <div>
        <Header />
        <Categories
          selectedCategory={this.state.selectedCategory}
          onChange={::this.onChange}
          />
        <Footer />
      </div>
    );
  }
}


class Header extends Component {
  render () {
    return <header><h2>Equip yourself</h2></header>;
  }
}

class Categories extends Component {
  render () {
    const keys = Object.keys(categories);
    const { selectedCategory } = this.props;


    const filteredCategories = selectedCategory
      ? [selectedCategory]
      : keys;

    return (
      <ol>
        {filteredCategories.map(key =>
          <Category
            selectedCategory={this.props.selectedCategory}
            id={key}
            onChange={this.props.onChange}
            {...categories[key]} />
        )}
      </ol>
    );
  }
}









class Category extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: null,
      sub: Object.keys(categories[this.props.id].subs)[0]
    };

  }

  selectSub (sub) {
    this.setState({
      sub
    });
  }

  selectCategory () {
    this.props.onChange(this.props.id);
  }

  deselectCategory () {
    this.props.onChange(null);
  }

  isSelected () {
    return this.props.selectedCategory === this.props.id;
  }

  submit () {
    console.log(1);
  }

  onChange (event, scope) {
    console.log(event.value);
  }

  render () {
    return <li
      key={this.props.id}
      className={this.isSelected() ? 'open' : null}>
        <h3 onClick={::this.selectCategory}>{this.props.title}</h3>
        { this.isSelected() && <a href="#" onClick={::this.deselectCategory}>close</a> }
        { this.isSelected() && this.renderSubs() }
    </li>;
  }

  renderSubs () {
    const subs = categories[this.props.selectedCategory].subs;
    const selectedSub = subs[this.state.sub] || subs[Object.keys(subs)[0]];
    return (
      <div>
        <nav>
          {Object.keys(subs).map(sub => <a onClick={this.selectSub.bind(this, sub)}>{sub}</a>)}
        </nav>

        <form>

          <input type="range" min={selectedSub.min} max={selectedSub.max} value={0} ref="min" defaultValue={selectedSub.min} onChange={::this.onChange} /> {this.state.min}
          <input type="range" min={selectedSub.min} max={selectedSub.max} ref="max" onChange={::this.onChange} /> {this.state.max}

          <button onClick={::this.submit}>submit</button>
        </form>

      </div>
    );
  }
}


class Footer extends Component {
  render () {
    return <footer>ads</footer>;
  }
}

React.render(
  <App />
  , document.body
);
