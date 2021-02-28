import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewsService from './news.service';

class App extends React.Component {

  constructor() {
    super();
    this.baseUrl = 'https://newsapi.org/v2/top-headlines?apiKey=b23feac6b1644599aeea94fb675aba4a&';
    this.state = {
      articles: [],
    }
    this.loadingRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const response = await NewsService.getIndiaNews(this.baseUrl);
      this.setState({ articles: response.articles });
    } catch (err) {
      console.log(err);
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    
    const observer = new IntersectionObserver(this.onScroll, options);
    observer.observe(this.loadingRef.current);
  }

  onScroll = (entries) => {
    if (entries.length > 0 && entries[0].isIntersecting) {
      
    }
  }

  search = async (e) => {
    if (e.target.value && e.key === 'Enter') {
      const response = await NewsService.search(this.baseUrl, e.target.value);
      this.setState({ articles: response.articles });
    }
  }
  
  render() {
    return (
      <div style={{marginRight: '20%', marginLeft: '20%'}}>
        <header className="App-header">
          <img style={{flexGrow: 1}} src={logo} className="App-logo" alt="logo" />
          <span style={{flexGrow: 1}}>News App</span>
          <span style={{flexGrow: 8, textAlign: 'right'}}>
            <input type="text" placeholder="Search news..." onKeyPress={this.search}/>
          </span>
        </header>
        <section className="wrapper">
          <section className="left-panel">
            <ul>
              <li>Sports</li>
              <li>Tech</li>
              <li>Business</li>
              <li>Politics</li>
            </ul>
          </section>
          <section className="right-panel">
            <ArticleList articles={this.state.articles} />
          </section>
        </section>
        <div ref={this.loadingRef}></div>
      </div>
    );
  }
}

const ArticleList = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => {
        return <a className="card" key={index} href={article.url} target="_blank" rel="noopener noreferrer">
          <News article={article}/>
          </a>;
      })}
    </>
  );
};

const News = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <h4>{article.author}, {new Date(article.publishedAt).toLocaleDateString()}</h4>
      <div style={{textAlign: "center"}}><img width="300" src={article.urlToImage} alt="article pic"/></div>
      <div>{`${article.description}...`}</div>
    </div>
  )
};

export default App;
